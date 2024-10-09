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
use Flarum\Http\RequestUtil;
use Flarum\Notification\NotificationSyncer;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Flarum\User\User;
use Illuminate\Contracts\Events\Dispatcher;
use Mattoid\MoneyHistory\Event\MoneyHistoryEvent;

class DeleteWarningController extends AbstractCreateController
{
    public $serializer = WarningSerializer::class;

    /**
     * @var NotificationSyncer
     */
    protected $notifications;
    protected $events;

    /**
     * @param NotificationSyncer $notifications
     */
    public function __construct(NotificationSyncer $notifications, Dispatcher $events)
    {
        $this->notifications = $notifications;
        $this->events = $events;
    }

    /**
     * {@inheritdoc}
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertCan('user.deleteWarnings');

        $warning = Warning::find(Arr::get($request->getQueryParams(), 'warning_id'));

        $warning->delete();

        $this->notifications->sync(new WarningBlueprint($warning), []);

        // 更新用户余额并添加到money history
        $user = User::find($warning->user_id);
        $user->money = $user->money + $warning->money;
        $user->save();
        $source = "DELWARNING";
        $sourceDesc = "取消警告扣能量";
        $this->events->dispatch(new MoneyHistoryEvent($user, $warning->money, $source, $sourceDesc));

        return $warning;
    }
}
