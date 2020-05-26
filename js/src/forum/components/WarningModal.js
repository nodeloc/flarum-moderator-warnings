import Alert from "flarum/components/Alert";
import Modal from "flarum/components/Modal";
import Button from "flarum/components/Button";
import username from "flarum/helpers/username";

export default class WarningModal extends Modal {
  init() {
    super.init();

    this.publicComment = m.prop("");
    this.privateComment = m.prop("");
    this.strikes = m.prop(0);
  }

  className() {
    return "WarningsModal Modal--large";
  }

  title() {
    return app.translator.trans(
      "askvortsov-moderator-warnings.forum.warning_modal.heading",
      { username: username(this.props.user) }
    );
  }

  content() {
    console.log;
    return (
      <div className="Modal-body">
        <div className="Form Form--centered">
          <div className="Form-group">
            <div>
              <label>
                {app.translator.trans(
                  "askvortsov-moderator-warnings.forum.warning_modal.strikes_heading"
                )}
                <input
                  type="number"
                  className="FormControl"
                  value={this.strikes()}
                  min="0"
                  max="5"
                  oninput={m.withAttr("value", this.strikes)}
                ></input>
              </label>
            </div>
          </div>
          <div className="Form-group">
            <div>
              <label>
                {app.translator.trans(
                  "askvortsov-moderator-warnings.forum.warning_modal.public_comment_heading",
                  {
                    username: username(this.props.user),
                  }
                )}
                <textarea
                  className="FormControl"
                  value={this.publicComment()}
                  required={true}
                  oninput={m.withAttr("value", this.publicComment)}
                  rows="6"
                />
              </label>
            </div>
          </div>
          <div className="Form-group">
            <div>
              <label>
                {app.translator.trans(
                  "askvortsov-moderator-warnings.forum.warning_modal.private_comment_heading",
                  {
                    username: username(this.props.user),
                  }
                )}
                <textarea
                  className="FormControl"
                  value={this.privateComment()}
                  oninput={m.withAttr("value", this.privateComment)}
                  rows="6"
                />
              </label>
            </div>
          </div>
          <div className="Form-group">
            <Button
              className="Button Button--primary Button--block"
              type="submit"
              loading={this.loading}
            >
              {app.translator.trans(
                "askvortsov-moderator-warnings.forum.warning_modal.submit_button"
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  onsubmit(e) {
    e.preventDefault();

    app.alerts.dismiss(this.successAlert);

    this.loading = true;

    if (!this.strikes()) {
      this.strikes(0);
    }

    const newWarning = {
      userId: this.props.user.id(),
      strikes: this.strikes(),
      public_comment: this.publicComment(),
      private_comment: this.privateComment(),
    };

    if (this.props.post) {
      newWarning.post = this.props.post;
    }

    app.store
      .createRecord("warnings")
      .save(newWarning)
      .then(this.hide.bind(this))
      .then(app.alerts.show((this.successAlert = new Alert({ type: 'success', children: app.translator.trans('askvortsov-moderator-warnings.forum.warning_modal.confirmation_message') }))))
      .then(this.props.callback)
      .catch(() => {});
  }
}
