import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import username from 'flarum/helpers/username';
import Stream from 'flarum/utils/Stream';
import Switch from 'flarum/common/components/Switch';
import Select from 'flarum/common/components/Select';
import app from 'flarum/forum/app'

export default class WarningModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);

    this.publicComment = Stream('');
    this.privateComment = Stream('');
    this.strikes = Stream(0);
    this.money = Stream(0);
    this.isRemoveLottery = Stream(false);

    this.snippets = app.forum.attribute('moderate-warnings.snippet') || {};
    this.snippetsSelect = {};
    Object.keys(this.snippets).forEach(key => {
      this.snippetsSelect[this.snippets[key]] = key;
    });
  }

  className() {
    return 'WarningsModal Modal--large';
  }

  title() {
    return app.translator.trans('askvortsov-moderator-warnings.forum.warning_modal.heading', { username: username(this.attrs.user) });
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form Form--centered">
          <div className="Form-group">
            <div>
              <label>
                {app.translator.trans('askvortsov-moderator-warnings.forum.warning_modal.strikes_heading')}
              </label>
              <input type="number" className="FormControl" bidi={this.strikes} min="0" max="5"></input>
            </div>
          </div>
          <div className="Form-group">
            <div>
              <label>
                扣多少能量？
              </label>
              <input type="number" className="FormControl" bidi={this.money} min="0" max="100"></input>
            </div>
          </div>
          <div className="Form-group">
            <div>
              <label>
                {app.translator.trans('askvortsov-moderator-warnings.forum.warning_modal.public_comment_heading', {
                  username: username(this.attrs.user),
                })}
              </label>
              <Select className="FormControl" options={this.snippetsSelect} onchange={this.setPublicCommentFromData.bind(this)}>
                {app.translator.trans('askvortsov-moderator-warnings.forum.snippet')}
              </Select>
              <textarea className="FormControl" bidi={this.publicComment} required={true} rows="6" />
            </div>
          </div>
          <div className="Form-group">
            <div>
              <label>
                {app.translator.trans('askvortsov-moderator-warnings.forum.warning_modal.private_comment_heading', {
                  username: username(this.attrs.user),
                })}
              </label>
              <textarea className="FormControl" bidi={this.privateComment} rows="6" />
            </div>
          </div>
          <div className="Form-group">
            <Switch state={this.isRemoveLottery()} onchange={this.isRemoveLottery}>
              移除用户所有抽奖？
            </Switch>
          </div>
          <div className="Form-group">
            <Button className="Button Button--primary Button--block" type="submit" loading={this.loading}>
              {app.translator.trans('askvortsov-moderator-warnings.forum.warning_modal.submit_button')}
            </Button>
          </div>
        </div>
      </div>
    );
  }
  setPublicCommentFromData(data) {
    this.publicComment(data);
  }
  setPublicComment(value) {
    switch (value) {
      case 'water_warning':
        this.publicComment('你好，你发布的内容符合版规【可讨论内容】第一条中“恶意水帖”一项，现对你进行警告并扣除相应能量，请自觉遵守相关版规要求参与论坛讨论，感谢你的配合！');
        break;
      case 'remove_lottery':
        this.publicComment('你好，你发布的内容符合版规【可讨论内容】第一条中“恶意水帖”一项，现对你进行警告并扣除相应能量，且你所参与抽奖已被移除，请满足条件后再重新参与！');
        break;
      case 'tag_error_warning':
        this.publicComment('你好，你发布的帖子选择标签错误，管理已为你更改标签，现对你进行警告并扣除相应能量，请在发帖时选择与您帖子内容相关的专业标签，以确保帖子能够得到正确的关注与回复，感谢你的配合！');
        break;
      case 'verification_warning':
        this.publicComment('你好，你发布的内容符合版规【可讨论内容】第一条中“涉政”一项，现对你进行警告并扣除相应能量，请不要讨论部分敏感话题，感谢你的配合！');
        break;
      case 'attack_warning':
        this.publicComment('你好，你发布的内容符合版规【可讨论内容】第一条中“攻击他人或引战”一项，现对你进行警告并扣除相应能量，请心平气和友好交流，维护和谐的论坛环境，感谢你的配合！');
        break;
      case 'uncomfortable_warning':
        this.publicComment('你好，你发布的内容符合版规【可讨论内容】第一条中“发表无意义内容”一项，现对你进行警告并扣除相应能量，请发表高质量内容，互相交流学习，感谢你的配合！');
        break;
      case 'notrue_warning':
        this.publicComment('你好，你发布的内容符合版规【可讨论内容】第一条中“扭曲事实”一项，现对你进行警告并扣除相应能量，网络信息真真假假难以分辨，请仔细辨别内容真实性再发布，感谢你的配合！');
        break;
      case 'ai_warning':
        this.publicComment('你好，你发布的内容疑似机器人或ai发布，现对你进行警告并扣除相应能量，感谢你的配合！！');
        break;
      default:
        this.publicComment('');
        break;
    }
  }

  onsubmit(e) {
    e.preventDefault();

    app.alerts.dismiss(this.successAlert);

    this.loading = true;

    if (!this.strikes()) {
      this.strikes(0);
    }
    if (!this.money()) {
      this.money(0);
    }
    const newWarning = {
      userId: this.attrs.user.id(),
      strikes: this.strikes(),
      money: this.money(),
      isRemoveLottery: this.isRemoveLottery(),
      public_comment: this.publicComment(),
      private_comment: this.privateComment(),
    };

    if (this.attrs.post) {
      newWarning.post = this.attrs.post;
    }

    app.store
      .createRecord('warnings')
      .save(newWarning)
      .then(this.hide.bind(this))
      .then(
        (this.successAlert = app.alerts.show(
          { type: 'success' },
          app.translator.trans('askvortsov-moderator-warnings.forum.warning_modal.confirmation_message')
        ))
      )
      .then(this.attrs.callback)
      .catch(() => { });
  }
}
