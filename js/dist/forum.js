(()=>{var t={n:n=>{var r=n&&n.__esModule?()=>n.default:()=>n;return t.d(r,{a:r}),r},d:(n,r)=>{for(var a in r)t.o(r,a)&&!t.o(n,a)&&Object.defineProperty(n,a,{enumerable:!0,get:r[a]})},o:(t,n)=>Object.prototype.hasOwnProperty.call(t,n),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},n={};(()=>{"use strict";t.r(n);const r=flarum.core.compat.app;var a=t.n(r);const s=flarum.core.compat["components/NotificationGrid"];var e=t.n(s);flarum.core;const o=flarum.core.compat.extend,i=flarum.core.compat["models/User"];var c=t.n(i);const u=flarum.core.compat.Model;var l=t.n(u);const p=flarum.core.compat["utils/PostControls"];var d=t.n(p);const f=flarum.core.compat["utils/UserControls"];var h=t.n(f);const g=flarum.core.compat["components/Button"];var v=t.n(g);function w(t,n){return w=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,n){return t.__proto__=n,t},w(t,n)}function b(t,n){t.prototype=Object.create(n.prototype),t.prototype.constructor=t,w(t,n)}const _=flarum.core.compat["components/Modal"];var y=t.n(_);const k=flarum.core.compat["helpers/username"];var W=t.n(k);const N=flarum.core.compat["utils/Stream"];var C=t.n(N),P=function(t){function n(){return t.apply(this,arguments)||this}b(n,t);var r=n.prototype;return r.oninit=function(n){t.prototype.oninit.call(this,n),this.publicComment=C()(""),this.privateComment=C()(""),this.strikes=C()(0)},r.className=function(){return"WarningsModal Modal--large"},r.title=function(){return app.translator.trans("askvortsov-moderator-warnings.forum.warning_modal.heading",{username:W()(this.attrs.user)})},r.content=function(){return m("div",{className:"Modal-body"},m("div",{className:"Form Form--centered"},m("div",{className:"Form-group"},m("div",null,m("label",null,app.translator.trans("askvortsov-moderator-warnings.forum.warning_modal.strikes_heading"),m("input",{type:"number",className:"FormControl",bidi:this.strikes,min:"0",max:"5"})))),m("div",{className:"Form-group"},m("div",null,m("label",null,app.translator.trans("askvortsov-moderator-warnings.forum.warning_modal.public_comment_heading",{username:W()(this.attrs.user)}),m("textarea",{className:"FormControl",bidi:this.publicComment,required:!0,rows:"6"})))),m("div",{className:"Form-group"},m("div",null,m("label",null,app.translator.trans("askvortsov-moderator-warnings.forum.warning_modal.private_comment_heading",{username:W()(this.attrs.user)}),m("textarea",{className:"FormControl",bidi:this.privateComment,rows:"6"})))),m("div",{className:"Form-group"},m(v(),{className:"Button Button--primary Button--block",type:"submit",loading:this.loading},app.translator.trans("askvortsov-moderator-warnings.forum.warning_modal.submit_button")))))},r.onsubmit=function(t){t.preventDefault(),app.alerts.dismiss(this.successAlert),this.loading=!0,this.strikes()||this.strikes(0);var n={userId:this.attrs.user.id(),strikes:this.strikes(),public_comment:this.publicComment(),private_comment:this.privateComment()};this.attrs.post&&(n.post=this.attrs.post),app.store.createRecord("warnings").save(n).then(this.hide.bind(this)).then(this.successAlert=app.alerts.show({type:"success"},app.translator.trans("askvortsov-moderator-warnings.forum.warning_modal.confirmation_message"))).then(this.attrs.callback).catch((function(){}))},n}(y());const A=flarum.core.compat["components/UserPage"];var L=t.n(A);const x=flarum.core.compat["components/LinkButton"];var I=t.n(x);function O(){return O=Object.assign?Object.assign.bind():function(t){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(t[a]=r[a])}return t},O.apply(this,arguments)}const U=flarum.core.compat.Component;var B=t.n(U);const M=flarum.core.compat["components/LoadingIndicator"];var j=t.n(M);const D=flarum.core.compat["components/Dropdown"];var S=t.n(D);const F=flarum.core.compat["components/Link"];var H=t.n(F);const T=flarum.core.compat["helpers/avatar"];var V=t.n(T);const R=flarum.core.compat["helpers/humanTime"];var z=t.n(R);const E=flarum.core.compat["utils/classList"];var q=t.n(E);const G=flarum.core.compat["components/PostPreview"];var J=t.n(G),K=function(t){function n(){return t.apply(this,arguments)||this}b(n,t);var r=n.prototype;return r.view=function(){return m("div",{className:"WarningPost"},m("ul",{class:"Dropdown-menu PostPreview-preview fade in"},m("li",null,J().component({post:this.attrs.post}))))},r.oncreate=function(n){t.prototype.oncreate.call(this,n),this.$(".PostPreview-preview").show().css("position","relative")},n}(B());const Q=flarum.core.compat["components/Separator"];var X=t.n(Q);const Y=flarum.core.compat["utils/ItemList"];var Z=t.n(Y);const tt={controls:function(t,n){var r=this,a=new(Z());return["user","moderation","destructive"].forEach((function(s){var e=r[s+"Controls"](t,n).toArray();e.length&&(e.forEach((function(t){return a.add(t.itemName,t)})),a.add(s+"Separator",X().component()))})),a},userControls:function(t,n){return new(Z())},moderationControls:function(t,n){return new(Z())},destructiveControls:function(t,n){var r=new(Z());return!t.isHidden()&&app.session.user.canManageWarnings()&&r.add("hide",m(v(),{icon:"far fa-trash-alt",onclick:this.hideAction.bind(t)},app.translator.trans("askvortsov-moderator-warnings.forum.warning_controls.delete_button"))),t.isHidden()&&app.session.user.canManageWarnings()&&r.add("restore",m(v(),{icon:"fas fa-reply",onclick:this.restoreAction.bind(t)},app.translator.trans("askvortsov-moderator-warnings.forum.warning_controls.restore_button"))),t.isHidden()&&app.session.user.canDeleteWarnings()&&r.add("delete",m(v(),{icon:"fas fa-times",onclick:this.deleteAction.bind(t)},app.translator.trans("askvortsov-moderator-warnings.forum.warning_controls.delete_forever_button"))),r},hideAction:function(){return this.pushAttributes({hiddenAt:new Date,hiddenUser:app.session.user}),this.save({isHidden:!0}).then((function(){return m.redraw()}))},restoreAction:function(){return this.pushAttributes({hiddenAt:null,hiddenUser:null}),this.save({isHidden:!1}).then((function(){return m.redraw()}))},deleteAction:function(t){return t&&(t.loading=!0),this.delete().then((function(){})).catch((function(){})).then((function(){t&&(t.loading=!1),location.reload()}))}};var nt=function(t){function n(){return t.apply(this,arguments)||this}b(n,t);var r=n.prototype;return r.view=function(){var t=this.attrs.warning,n=t.addedByUser(),r=tt.controls(t,this).toArray();return m("div",this.elementAttrs(),r.length?S().component({icon:"fas fa-ellipsis-v",className:"WarningListItem-controls",buttonClassName:"Button Button--icon Button--flat Slidable-underneath Slidable-underneath--right"},r):"",m("div",{className:"WarningListItem-main"},m("h3",{className:"WarningListItem-title"},m(H(),{href:n?app.route.user(n):"#",className:"WarningListItem-author"},V()(n)," ",W()(n))),m("span",{class:"WarningListItem-strikes"},t.isHidden()?app.translator.trans("askvortsov-moderator-warnings.forum.warning_list_item.list_item_heading_hidden",{time:z()(t.createdAt()),strikes:t.strikes()||0}):app.translator.trans("askvortsov-moderator-warnings.forum.warning_list_item.list_item_heading",{time:z()(t.createdAt()),strikes:t.strikes()||0})),m("hr",null),m("ul",{className:"WarningListItem-info"},t.post()?m("li",{className:"item-excerpt"},m("h3",{className:"WarningListItem-subtitle"},app.translator.trans("askvortsov-moderator-warnings.forum.warning_list_item.linked_post")),K.component({post:t.post()})):"",m("li",{className:"item-excerpt"},m("h3",{className:"WarningListItem-subtitle"},app.translator.trans("askvortsov-moderator-warnings.forum.warning_list_item.public_comment")),m("p",{class:"WarningListItem-comment"},m.trust(t.public_comment()))),app.session.user.canManageWarnings()&&t.private_comment()?m("li",{className:"item-excerpt"},m("h3",{className:"WarningListItem-subtitle"},app.translator.trans("askvortsov-moderator-warnings.forum.warning_list_item.private_comment")),m("p",{class:"WarningListItem-comment"},m.trust(t.private_comment()))):"")))},r.elementAttrs=function(){var t=this.attrs.warning,n={};return n.className=(n.className||"")+" "+q()({WarningListItem:!0,"WarningListItem--hidden":t.isHidden()}),n},n}(B());const rt=flarum.core.compat["helpers/listItems"];var at=t.n(rt),st=function(t){function n(){return t.apply(this,arguments)||this}b(n,t);var r=n.prototype;return r.oninit=function(n){t.prototype.oninit.call(this,n),this.loading=!0,this.warnings=[],this.user=this.attrs.params.user,this.refresh()},r.view=function(){var t;return this.loading&&(t=j().component({size:"large"})),m("div",{className:"WarningList"},m("h1",{className:"WarningList-warnings"},this.strikeCount()?a().translator.trans("askvortsov-moderator-warnings.forum.warning_list.warnings",{strikes:this.strikeCount()||0}):a().translator.trans("askvortsov-moderator-warnings.forum.warning_list.warnings_no_strikes")),m("div",{class:"Warnings-toolbar"},m("ul",{className:"Warnings-toolbar-action"},at()(this.actionItems().toArray()))),m("ul",{className:"WarningList-Warnings"},this.warnings.map((function(t){return m("li",{key:t.id(),"data-id":t.id()},nt.component({warning:t}))})),!this.loading&&0===this.warnings.length&&m("label",null,a().translator.trans("askvortsov-moderator-warnings.forum.warning_list.no_warnings"))),m("div",{className:"WarningList-loadMore"},t))},r.actionItems=function(){var t=new(Z());return a().session.user.canManageWarnings()&&t.add("create_warning",m(v(),{className:"Button Button--primary",onclick:this.handleOnClickCreate.bind(this)},a().translator.trans("askvortsov-moderator-warnings.forum.warning_list.add_button"))),t},r.strikeCount=function(){return this.warnings.filter((function(t){return!t.isHidden()})).map((function(t){return t.strikes()})).reduce((function(t,n){return t+n}),0)},r.parseResults=function(t){return[].push.apply(this.warnings,t),this.loading=!1,m.redraw(),t},r.refresh=function(){var t=this;return a().store.find("warnings",this.user.id()).catch((function(){})).then((function(n){t.warnings=[],t.parseResults(n)}))},r.handleOnClickCreate=function(t){t.preventDefault(),a().modal.show(P,O({callback:this.refresh.bind(this)},this.attrs.params))},n}(B()),et=function(t){function n(){return t.apply(this,arguments)||this}b(n,t);var r=n.prototype;return r.oninit=function(n){t.prototype.oninit.call(this,n),this.loadUser(m.route.param("username"))},r.content=function(){if(app.session.user&&(app.session.user.canViewWarnings()||this.user.id()===app.session.user.id()&&this.user.visibleWarningCount()>0))return m("div",{className:"WarningsUserPage"},st.component({params:{user:this.user,sort:"newest"}}))},n}(L());function ot(){app.routes["user.warnings"]={path:"/u/:username/warnings",component:et},(0,o.extend)(L().prototype,"navItems",(function(t){app.session.user&&(app.session.user.canViewWarnings()||this.user.id()===app.session.user.id()&&this.user.visibleWarningCount()>0)&&t.add("warnings",I().component({href:app.route("user.warnings",{username:this.user.slug()}),icon:"fas fa-exclamation-circle"},[app.translator.trans("askvortsov-moderator-warnings.forum.user.warnings"),this.user.visibleWarningCount()>0?m("span",{className:"Button-badge"},this.user.visibleWarningCount()):""]),10)}))}const it=flarum.core.compat["models/Post"];var ct=t.n(it);const mt=flarum.core.compat["components/CommentPost"];var ut=t.n(mt);const lt=flarum.core.compat["helpers/icon"];var pt=t.n(lt),dt=function(t){function n(){return t.apply(this,arguments)||this}b(n,t);var r=n.prototype;return r.oninit=function(n){t.prototype.oninit.call(this,n),this.warning=this.attrs.warning},r.view=function(){return m(H(),{className:"WarningPreview",href:app.route("user.warnings",{username:this.warning.warnedUser().username()})},m(nt,{warning:this.warning}))},n}(B()),ft=function(t){function n(){return t.apply(this,arguments)||this}b(n,t);var r=n.prototype;return r.oninit=function(n){t.prototype.oninit.call(this,n),this.warning=this.attrs.warning},r.view=function(){return m("div",{className:"Post-warning"},m("span",{className:"Post-warning-summary"},pt()("fas fa-exclamation-circle"),this.warning.strikes()?app.translator.trans("askvortsov-moderator-warnings.forum.post.warning",{strikes:this.warning.strikes()||0,mod_username:W()(this.warning.addedByUser())}):app.translator.trans("askvortsov-moderator-warnings.forum.post.warning_no_strikes",{mod_username:W()(this.warning.addedByUser())})))},r.oncreate=function(n){var r=this;t.prototype.oncreate.call(this,n);var a,s=this.warning,e=function(){r.$(".Post-warning-preview").removeClass("in").one("transitionend",(function(){$(this).hide()}))},o=$('<ul class="Dropdown-menu Post-warning-preview fade"/>');this.$().append(o),this.$().children().hover((function(){clearTimeout(a),a=setTimeout((function(){!o.hasClass("in")&&o.is(":visible")||(m.render(o[0],m("li",{"data-id":s.id()},dt.component({warning:s}))),o.show(),setTimeout((function(){return o.off("transitionend").addClass("in")})))}),200)}),(function(){clearTimeout(a),a=setTimeout(e,250)})),$(".Post-warning").find(".Post-warning-summary a").hover((function(){$(".Post-warning").find('[data-number="'+$(this).data("number")+'"]').addClass("active")}),(function(){$(".Post-warning").find("[data-number]").removeClass("active")}))},n}(B()),ht=function(t){function n(){return t.apply(this,arguments)||this}b(n,t);var r=n.prototype;return r.oninit=function(n){t.prototype.oninit.call(this,n),this.post=this.attrs.post},r.view=function(){return m("div",{className:"Post-warning-list"},this.attrs.post.warnings().map((function(t){return ft.component({warning:t})})))},n}(B());const gt=flarum.core.compat["components/Notification"];var vt=function(t){function n(){return t.apply(this,arguments)||this}b(n,t);var r=n.prototype;return r.icon=function(){return"fas fa-exclamation-circle"},r.href=function(){return app.route("user.warnings",{username:app.session.user.username()})},r.content=function(){var t=this.attrs.notification.subject();return t.strikes()?app.translator.trans("askvortsov-moderator-warnings.forum.notifications.warning_text",{mod_username:W()(this.attrs.notification.fromUser()),strikes:t.strikes()||0}):app.translator.trans("askvortsov-moderator-warnings.forum.notifications.warning_no_strikes_text",{mod_username:W()(this.attrs.notification.fromUser())})},n}(t.n(gt)());const wt=flarum.core.compat["utils/computed"];var bt=t.n(wt),_t=function(t){function n(){return t.apply(this,arguments)||this}return b(n,t),n}(l());Object.assign(_t.prototype,{id:l().attribute("id"),public_comment:l().attribute("public_comment"),private_comment:l().attribute("private_comment"),strikes:l().attribute("strikes"),createdAt:l().attribute("createdAt",l().transformDate),isHidden:bt()("hiddenAt",(function(t){return!!t})),hiddenAt:l().attribute("hiddenAt",l().transformDate),warnedUser:l().hasOne("warnedUser"),hiddenByUser:l().hasOne("hiddenByUser"),addedByUser:l().hasOne("addedByUser"),post:l().hasOne("post")}),a().initializers.add("askvortsov/flarum-moderator-warnings",(function(t){t.store.models.warnings=_t,c().prototype.canViewWarnings=l().attribute("canViewWarnings"),c().prototype.canManageWarnings=l().attribute("canManageWarnings"),c().prototype.canDeleteWarnings=l().attribute("canDeleteWarnings"),c().prototype.visibleWarningCount=l().attribute("visibleWarningCount"),(0,o.extend)(d(),"moderationControls",(function(t,n){a().session.user&&a().session.user.canManageWarnings()&&t.add("warning",m(v(),{icon:"fas fa-exclamation-circle",onclick:function(){return a().modal.show(P,{callback:function(){location.reload()},user:n.user(),post:n})}},a().translator.trans("askvortsov-moderator-warnings.forum.post_controls.warning_button")))})),(0,o.extend)(h(),"moderationControls",(function(t,n){a().session.user&&a().session.user.canManageWarnings()&&t.add("warning",m(v(),{icon:"fas fa-exclamation-circle",onclick:function(){return a().modal.show(P,{callback:function(){location.reload()},user:n})}},a().translator.trans("askvortsov-moderator-warnings.forum.post_controls.warning_button")))})),ot(),ct().prototype.warnings=l().hasMany("warnings"),(0,o.extend)(ut().prototype,"footerItems",(function(t){var n=this.attrs.post;n.warnings()&&t.add("warnings",ht.component({post:n}))})),t.notificationComponents.warning=vt,(0,o.extend)(e().prototype,"notificationTypes",(function(n){n.add("warning",{name:"warning",icon:"fas fa-exclamation-circle",label:t.translator.trans("askvortsov-moderator-warnings.forum.settings.warning_notification_label")})}))}))})(),module.exports=n})();
//# sourceMappingURL=forum.js.map