import ExtensionPage from "flarum/admin/components/ExtensionPage";
import app from 'flarum/admin/app';
import Button from "flarum/common/components/Button";
import LoadingIndicator from "flarum/common/components/LoadingIndicator";
import Checkbox from "flarum/common/components/Checkbox";
import Stream from 'flarum/common/utils/Stream';
import Alert from "flarum/common/components/Alert";
import Select from "flarum/common/components/Select";
function _trans(key, params) {
    const dat = app.translator.trans("askvortsov-moderator-warnings.admin." + key, params);
    if (Array.isArray(dat)) return dat.join("");
    return dat;
}

export default class adminPage extends ExtensionPage {
    snippets
    snippetsData = []
    blackholeId
    tagOptions = {}
    oninit(vnode) {
        super.oninit(vnode);
        this.snippets = this.setting("moderate-warnings.snippet");
        const tmp = JSON.parse(this.snippets() || "{}");
        Object.keys(tmp).forEach(key => {
            this.snippetsData.push({ name: key, data: tmp[key] })
        });
    }
    oncreate(vnode) {
        super.oncreate(vnode);
    }
    content(vnode) {
        return <div className="moderate-warnings-adminPage-container container">
            <h2>{_trans("snippet")}</h2>
            <table className="Table Table--full">
                <thead>
                    <tr>
                        <th>{_trans('snippet_key')}</th>
                        <th>{_trans('snippet_content')}</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.snippetsData.map((item, index) => {
                        return <tr key={index}>
                            <td><input className="FormControl" type="text" value={item.name} onchange={((e) => {
                                this.snippetsData[index].name = (e.target).value;
                                this.storeSetting()
                            }).bind(this)} /></td>
                            <td><textarea className="FormControl" value={item.data} onchange={((e) => {
                                this.snippetsData[index].data = (e.target ).value;
                                this.storeSetting()
                            }).bind(this)}>{item.data}</textarea></td>
                            <td>
                                <Button onclick={(() => {
                                    if (confirm(_trans("confirm")))
                                        this.snippetsData.splice(index, 1);
                                    m.redraw();
                                }).bind(this)}>
                                    <i className="fas fa-trash"></i>
                                </Button>
                            </td>
                        </tr>
                    })}
                    <tr><td><Button className="Button Button--secondary" onclick={this.addRow.bind(this)}>{_trans("addRow")}</Button></td></tr>
                </tbody>
            </table>
            <br></br>
            {this.submitButton()}
        </div>
    }

    addRow() {
        this.snippetsData.push({
            name: "", data: ""
        })
    }
    storeSetting() {
        const dat = {};
        this.snippetsData.forEach(snippet => {
            dat[snippet.name] = snippet.data;
        })
        this.snippets(JSON.stringify(dat));
    }
}