YUI.add("tabview",function(e,t){var n=".",r=e.Base.create("tabView",e.Widget,[e.WidgetParent],{_afterChildAdded:function(){this.get("contentBox").focusManager.refresh()},_defListNodeValueFn:function(){var t=e.Node.create(this.LIST_TEMPLATE);return t.addClass(e.TabviewBase._classNames.tabviewList),t},_defPanelNodeValueFn:function(){var t=e.Node.create(this.PANEL_TEMPLATE);return t.addClass(e.TabviewBase._classNames.tabviewPanel),t},_afterChildRemoved:function(e){var t=e.index,n=this.get("selection");n||(n=this.item(t-1)||this.item(0),n&&n.set("selected",1)),this.get("contentBox").focusManager.refresh()},_initAria:function(t){var n=t.one(e.TabviewBase._queries.tabviewList);n&&n.setAttrs({role:"tablist"})},bindUI:function(){this.get("contentBox").plug(e.Plugin.NodeFocusManager,{descendants:n+e.TabviewBase._classNames.tabLabel,keys:{next:"down:39",previous:"down:37"},circular:!0}),this.after("render",this._setDefSelection),this.after("addChild",this._afterChildAdded),this.after("removeChild",this._afterChildRemoved)},renderUI:function(){var e=this.get("contentBox");this._renderListBox(e),this._renderPanelBox(e),this._childrenContainer=this.get("listNode"),this._renderTabs(e),this._initAria(e)},_setDefSelection:function(){var e=this.get("selection")||this.item(0);this.some(function(t){if(t.get("selected"))return e=t,!0}),e&&(this.set("selection",e),e.set("selected",1))},_renderListBox:function(e){var t=this.get("listNode");t.inDoc()||e.append(t)},_renderPanelBox:function(e){var t=this.get("panelNode");t.inDoc()||e.append(t)},_renderTabs:function(t){var r=e.TabviewBase._classNames,i=e.TabviewBase._queries,s=t.all(i.tab),o=this.get("panelNode"),u=o?this.get("panelNode").get("children"):null,a=this;s&&(s.addClass(r.tab),t.all(i.tabLabel).addClass(r.tabLabel),t.all(i.tabPanel).addClass(r.tabPanel),s.each(function(e,t){var i=u?u.item(t):null;a.add({boundingBox:e,contentBox:e.one(n+r.tabLabel),panelNode:i})}))}},{ATTRS:{defaultChildType:{value:"Tab"},listNode:{setter:function(t){return t=e.one(t),t&&t.addClass(e.TabviewBase._classNames.tabviewList),t},valueFn:"_defListNodeValueFn"},panelNode:{setter:function(t){return t=e.one(t),t&&t.addClass(e.TabviewBase._classNames.tabviewPanel),t},valueFn:"_defPanelNodeValueFn"},tabIndex:{value:null}},HTML_PARSER:{listNode:function(t){return t.one(e.TabviewBase._queries.tabviewList)},panelNode:function(t){return t.one(e.TabviewBase._queries.tabviewPanel)}},LIST_TEMPLATE:"<ul></ul>",PANEL_TEMPLATE:"<div></div>"});r.prototype.LIST_TEMPLATE=r.LIST_TEMPLATE,r.prototype.PANEL_TEMPLATE=r.PANEL_TEMPLATE,e.TabView=r,e.Tab=e.Base.create("tab",e.Widget,[e.WidgetChild],{BOUNDING_TEMPLATE:"<li></li>",CONTENT_TEMPLATE:"<a></a>",PANEL_TEMPLATE:"<div></div>",_uiSetSelectedPanel:function(t){this.get("panelNode").toggleClass(e.TabviewBase._classNames.selectedPanel,t)},_afterTabSelectedChange:function(e){this._uiSetSelectedPanel(e.newVal)},_afterParentChange:function(e){e.newVal?this._add():this._remove()},_initAria:function(){var t=this.get("contentBox"),n=t.get("id"),r=this.get("panelNode");n||(n=e.guid(),t.set("id",n)),t.set("role","tab"),t.get("parentNode").set("role","presentation"),r.setAttrs({role:"tabpanel","aria-labelledby":n})},syncUI:function(){var t=e.TabviewBase._classNames;this.get("boundingBox").addClass(t.tab),this.get("contentBox").addClass(t.tabLabel),this.set("label",this.get("label")),this.set("content",this.get("content")),this._uiSetSelectedPanel(this.get("selected"))},bindUI:function(){this.after("selectedChange",this._afterTabSelectedChange),this.after("parentChange",this._afterParentChange)},renderUI:function(){this._renderPanel(),this._initAria()},_renderPanel:function(){this.get("parent").get("panelNode").appendChild(this.get("panelNode"))},_add:function(){var e=this.get("parent").get("contentBox"),t=e.get("listNode"),n=e.get("panelNode");t&&t.appendChild(this.get("boundingBox")),n&&n.appendChild(this.get("panelNode"))},_remove:function(){this.get("boundingBox").remove(),this.get("panelNode").remove()},_onActivate:function(e){e.target===this&&(e.domEvent.preventDefault(),e.target.set("selected",1))},initializer:function(){this.publish(this.get("triggerEvent"),{defaultFn:this._onActivate})},_defLabelGetter:function(){return this.get("contentBox").getHTML()},_defLabelSetter:function(e){var t=this.get("contentBox");return t.getHTML()!==e&&t.setHTML(e),e},_defContentSetter:function(e){var t=this.get("panelNode");return t.getHTML()!==e&&t.setHTML(e),e},_defContentGetter:function(){return this.get("panelNode").getHTML()},_defPanelNodeValueFn:function(){var t=e.TabviewBase._classNames,n=this.get("contentBox").get("href")||"",r=this.get("parent"),i=n.indexOf("#"),s;return n=n.substr(i),n.charAt(0)==="#"&&(s=e.one(n),s&&s.addClass(t.tabPanel)),!s&&r&&(s=r.get("panelNode").get("children").item(this.get("index"))),s||(s=e.Node.create(this.PANEL_TEMPLATE),s.addClass(t.tabPanel)),s}},{ATTRS:{triggerEvent:{value:"click"},label:{setter:"_defLabelSetter",getter:"_defLabelGetter"},content:{setter:"_defContentSetter",getter:"_defContentGetter"},panelNode:{setter:function(t){return t=e.one(t),t&&t.addClass(e.TabviewBase._classNames.tabPanel),t},valueFn:"_defPanelNodeValueFn"},tabIndex:{value:null,validator:"_validTabIndex"}},HTML_PARSER:{selected:function(){var t=this.get("boundingBox").hasClass(e.TabviewBase._classNames.selectedTab)?1:0;return t}}})},"patched-v3.16.0",{requires:["widget","widget-parent","widget-child","tabview-base","node-pluginhost","node-focusmanager"],skinnable:!0});
