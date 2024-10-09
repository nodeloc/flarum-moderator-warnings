<?php

/*
 * This file is part of askvortsov/flarum-moderator-warnings
 *
 *  Copyright (c) 2021 Alexander Skvortsov.
 *
 *  For detailed copyright and license information, please view the
 *  LICENSE file that was distributed with this source code.
 */

namespace Askvortsov\FlarumWarnings\Api\Controller;

use Askvortsov\FlarumWarnings\Api\Serializer\WarningSerializer;
use Askvortsov\FlarumWarnings\Model\Warning;
use Askvortsov\FlarumWarnings\Notification\WarningBlueprint;
use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Foundation\ValidationException;
use Flarum\Http\RequestUtil;
use Flarum\Locale\Translator;
use Flarum\Notification\NotificationSyncer;
use Flarum\Post\Post;
use Illuminate\Support\Carbon;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Mattoid\MoneyHistory\Event\MoneyHistoryEvent;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\User\User;
use Nodeloc\Lottery\Lottery;

class CreateWarningController extends AbstractCreateController
{
    public $serializer = WarningSerializer::class;
    /**
     * @var NotificationSyncer
     */
    protected $notifications;

    /**
     * @var Translator
     */
    protected $translator;

    protected $events;


    /**
     * @param NotificationSyncer $notifications
     */
    public function __construct(NotificationSyncer $notifications, Translator $translator, Dispatcher $events)
    {
        $this->notifications = $notifications;
        $this->events = $events;

        $this->translator = $translator;
    }

    /**
     * {@inheritdoc}
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertCan('user.manageWarnings');

        $requestData = $request->getParsedBody()['data']['attributes'];
        $requestRelationships = $request->getParsedBody()['data']['relationships'] ?? [];

        $publicComment = $requestData['public_comment'];

        if (trim($publicComment) === '') {
            throw new ValidationException(['message' => $this->translator->trans('askvortsov-moderator-warnings.forum.validation.public_comment_required')]);
        }

        $warning = new Warning();
        $warning->user_id = $requestData['userId'];
        $warning->public_comment = Warning::getFormatter()->parse($publicComment, new Post());
        $warning->private_comment = Warning::getFormatter()->parse($requestData['private_comment'], new Post());
        $warning->strikes = $requestData['strikes'];
        $warning->money = $requestData['money'];
        $warning->created_user_id = $actor->id;
        $warning->created_at = Carbon::now();

        if (array_key_exists('post', $requestRelationships)) {
            $warning->post_id = $requestRelationships['post']['data']['id'];
        }

        if (! $warning->strikes) {
            $warning->strikes = 0;
        }

        if ($warning->strikes < 0 || $warning->strikes > 5) {
            throw new ValidationException(['message' => $this->translator->trans('askvortsov-moderator-warnings.forum.validation.invalid_strike_count')]);
        }

        if (! $warning->money) {
            $warning->money = 0;
        }

        $warning->save();

        // 是否移除用户所有的抽奖
        $isRemoveLottery =  $requestData['isRemoveLottery'];
        if($isRemoveLottery){
            // 获取用户ID
            $userId = $warning->user_id;

            // 找到所有状态为 0 的 lottery
            $lotteries = Lottery::where('status', 0)->get();

            foreach ($lotteries as $lottery) {
                // 查找该用户在当前 lottery 中的参与者记录
                $participant = $lottery->participants()->where('user_id', $userId)->first();
                if ($participant) {
                    // 删除参与者记录
                    $participant->delete();
                    $lottery->decrement('enter_count');
                }
            }
        }

        // 更新用户余额并添加到money history
        if($warning->money>0){
            $user = User::find($warning->user_id);
            $user->money = $user->money - $warning->money;
            $user->save();
            $source = "WARNING";
            $sourceDesc = "警告扣能量";
            $this->events->dispatch(new MoneyHistoryEvent($user, -$warning->money, $source, $sourceDesc));
        }
        $this->notifications->sync(new WarningBlueprint($warning), [$warning->warnedUser]);

        return $warning;
    }
}
