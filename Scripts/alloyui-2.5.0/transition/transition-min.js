YUI.add("transition",function(e,t){var n="",r="",i=e.config.doc,s="documentElement",o=i[s].style,u="transition",a="transitionProperty",f,l,c,h,p,d,v={},m=["Webkit","Moz"],g={Webkit:"webkitTransitionEnd"},y=function(){this.init.apply(this,arguments)};y._TRANSFORM="transform",y._toCamel=function(e){return e=e.replace(/-([a-z])/gi,function(e,t){return t.toUpperCase()}),e},y._toHyphen=function(e){return e=e.replace(/([A-Z]?)([a-z]+)([A-Z]?)/g,function(e,t,n,r){var i=(t?"-"+t.toLowerCase():"")+n;return r&&(i+="-"+r.toLowerCase()),i}),e},y.SHOW_TRANSITION="fadeIn",y.HIDE_TRANSITION="fadeOut",y.useNative=!1,"transition"in o&&"transitionProperty"in o&&"transitionDuration"in o&&"transitionTimingFunction"in o&&"transitionDelay"in o?(y.useNative=!0,y.supported=!0):e.Array.each(m,function(e){var t=e+"Transition";t in i[s].style&&(n=e,r=y._toHyphen(e)+"-",y.useNative=!0,y.supported=!0,y._VENDOR_PREFIX=e)}),typeof o.transform=="undefined"&&e.Array.each(m,function(e){var t=e+"Transform";typeof o[t]!="undefined"&&(y._TRANSFORM=t)}),n&&(u=n+"Transition",a=n+"TransitionProperty"),f=r+"transition-property",l=r+"transition-duration",c=r+"transition-timing-function",h=r+"transition-delay",p="transitionend",d="on"+n.toLowerCase()+"transitionend",p=g[n]||p,y.fx={},y.toggles={},y._hasEnd={},y._reKeywords=/^(?:node|duration|iterations|easing|delay|on|onstart|onend)$/i,e.Node.DOM_EVENTS[p]=1,y.NAME="transition",y.DEFAULT_EASING="ease",y.DEFAULT_DURATION=.5,y.DEFAULT_DELAY=0,y._nodeAttrs={},y.prototype={constructor:y,init:function(e,t){var n=this;return n._node=e,!n._running&&t&&(n._config=t,e._transition=n,n._duration="duration"in t?t.duration:n.constructor.DEFAULT_DURATION,n._delay="delay"in t?t.delay:n.constructor.DEFAULT_DELAY,n._easing=t.easing||n.constructor.DEFAULT_EASING,n._count=0,n._running=!1),n},addProperty:function(t,n){var r=this,i=this._node,s=e.stamp(i),o=e.one(i),u=y._nodeAttrs[s],a,f,l,c,h;u||(u=y._nodeAttrs[s]={}),c=u[t],n&&n.value!==undefined?h=n.value:n!==undefined&&(h=n,n=v),typeof h=="function"&&(h=h.call(o,o)),c&&c.transition&&c.transition!==r&&c.transition._count--,r._count++,l=(typeof n.duration!="undefined"?n.duration:r._duration)||1e-4,u[t]={value:h,duration:l,delay:typeof n.delay!="undefined"?n.delay:r._delay,easing:n.easing||r._easing,transition:r},a=e.DOM.getComputedStyle(i,t),f=typeof h=="string"?a:parseFloat(a),y.useNative&&f===h&&setTimeout(function(){r._onNativeEnd.call(i,{propertyName:t,elapsedTime:l})},l*1e3)},removeProperty:function(t){var n=this,r=y._nodeAttrs[e.stamp(n._node)];r&&r[t]&&(delete r[t],n._count--)},initAttrs:function(t){var n,r=this._node;t.transform&&!t[y._TRANSFORM]&&(t[y._TRANSFORM]=t.transform,delete t.transform);for(n in t)t.hasOwnProperty(n)&&!y._reKeywords.test(n)&&(this.addProperty(n,t[n]),r.style[n]===""&&e.DOM.setStyle(r,n,e.DOM.getComputedStyle(r,n)))},run:function(t){var n=this,r=n._node,i=n._config,s={type:"transition:start",config:i};return n._running||(n._running=!0,i.on&&i.on.start&&i.on.start.call(e.one(r),s),n.initAttrs(n._config),n._callback=t,n._start()),n},_start:function(){this._runNative()},_prepDur:function(e){return e=parseFloat(e)*1e3,e+"ms"},_runNative:function(){var t=this,n=t._node,r=e.stamp(n),i=n.style,s=n.ownerDocument.defaultView.getComputedStyle(n),o=y._nodeAttrs[r],u="",a=s[y._toCamel(f)],d=f+": ",v=l+": ",m=c+": ",g=h+": ",b,w,E;a!=="all"&&(d+=a+",",v+=s[y._toCamel(l)]+",",m+=s[y._toCamel(c)]+",",g+=s[y._toCamel(h)]+",");for(E in o)b=y._toHyphen(E),w=o[E],(w=o[E])&&w.transition===t&&(E in n.style?(v+=t._prepDur(w.duration)+",",g+=t._prepDur(w.delay)+",",m+=w.easing+",",d+=b+",",u+=b+": "+w.value+"; "):this.removeProperty(E));d=d.replace(/,$/,";"),v=v.replace(/,$/,";"),m=m.replace(/,$/,";"),g=g.replace(/,$/,";"),y._hasEnd[r]||(n.addEventListener(p,t._onNativeEnd,""),y._hasEnd[r]=!0),i.cssText+=d+v+m+g+u},_end:function(t){var n=this,r=n._node,i=n._callback,s=n._config,o={type:"transition:end",config:s,elapsedTime:t},u=e.one(r);n._running=!1,n._callback=null,r&&(s.on&&s.on.end?setTimeout(function(){s.on.end.call(u,o),i&&i.call(u,o)},1):i&&setTimeout(function(){i.call(u,o)},1))},_endNative:function(e){var t=this._node,n=t.ownerDocument.defaultView.getComputedStyle(t,"")[y._toCamel(f)];e=y._toHyphen(e),typeof n=="string"&&(n=n.replace(new RegExp("(?:^|,\\s)"+e+",?"),","),n=n.replace(/^,|,$/,""),t.style[u]=n)},_onNativeEnd:function(t){var n=this,r=e.stamp(n),i=t,s=y._toCamel(i.propertyName),o=i.elapsedTime,u=y._nodeAttrs[r],f=u[s],l=f?f.transition:null,c,h;l&&(l.removeProperty(s),l._endNative(s),h=l._config[s],c={type:"propertyEnd",propertyName:s,elapsedTime:o,config:h},h&&h.on&&h.on.end&&h.on.end.call(e.one(n),c),l._count<=0&&(l._end(o),n.style[a]=""))},destroy:function(){var e=this,t=e._node;t&&(t.removeEventListener(p,e._onNativeEnd,!1),e._node=null)}},e.Transition=y,e.TransitionNative=y,e.Node.prototype.transition=function(t,n,r){var i=y._nodeAttrs[e.stamp(this._node)],s=i?i.transition||null:null,o,u;if(typeof t=="string"){typeof n=="function"&&(r=n,n=null),o=y.fx[t];if(n&&typeof n=="object"){n=e.clone(n);for(u in o)o.hasOwnProperty(u)&&(u in n||(n[u]=o[u]))}else n=o}else r=n,n=t;return s&&!s._running?s.init(this,n):s=new y(this._node,n),s.run(r),this},e.Node.prototype.show=function(t,n,r){return this._show(),t&&e.Transition&&(typeof t!="string"&&!t.push&&(typeof n=="function"&&(r=n,n=t),t=y.SHOW_TRANSITION),this.transition(t,n,r)),this},e.NodeList.prototype.show=function(t,n,r){var i=this._nodes,s=0,o;while(o=i[s++])e.one(o).show(t,n,r);return this};var b=function(e,t,n){return function(){t&&t.call(e),n&&typeof n=="function"&&n.apply(e._node,arguments)}};e.Node.prototype.hide=function(t,n,r){return t&&e.Transition?(typeof n=="function"&&(r=n,n=null),r=b(this,this._hide,r),typeof t!="string"&&!t.push&&(typeof n=="function"&&(r=n,n=t),t=y.HIDE_TRANSITION),this.transition(t,n,r)):this._hide(),this},e.NodeList.prototype.hide=function(t,n,r){var i=this._nodes,s=0,o;while(o=i[s++])e.one(o).hide(t,n,r);return this},e.NodeList.prototype
.transition=function(t,n,r){var i=this._nodes,s=this.size(),o=0,r=r===!0,u;while(u=i[o++])o<s&&r?e.one(u).transition(t):e.one(u).transition(t,n);return this},e.Node.prototype.toggleView=function(t,n,r){this._toggles=this._toggles||[],r=arguments[arguments.length-1];if(typeof t!="string"){n=t,this._toggleView(n,r);return}return typeof n=="function"&&(n=undefined),typeof n=="undefined"&&t in this._toggles&&(n=!this._toggles[t]),n=n?1:0,n?this._show():r=b(this,this._hide,r),this._toggles[t]=n,this.transition(e.Transition.toggles[t][n],r),this},e.NodeList.prototype.toggleView=function(t,n,r){var i=this._nodes,s=0,o;while(o=i[s++])o=e.one(o),o.toggleView.apply(o,arguments);return this},e.mix(y.fx,{fadeOut:{opacity:0,duration:.5,easing:"ease-out"},fadeIn:{opacity:1,duration:.5,easing:"ease-in"},sizeOut:{height:0,width:0,duration:.75,easing:"ease-out"},sizeIn:{height:function(e){return e.get("scrollHeight")+"px"},width:function(e){return e.get("scrollWidth")+"px"},duration:.5,easing:"ease-in",on:{start:function(){var e=this.getStyle("overflow");e!=="hidden"&&(this.setStyle("overflow","hidden"),this._transitionOverflow=e)},end:function(){this._transitionOverflow&&(this.setStyle("overflow",this._transitionOverflow),delete this._transitionOverflow)}}}}),e.mix(y.toggles,{size:["sizeOut","sizeIn"],fade:["fadeOut","fadeIn"]})},"patched-v3.16.0",{requires:["node-style"]});
