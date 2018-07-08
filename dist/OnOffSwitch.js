!function(t,i){for(var e in i)t[e]=i[e]}(window,function(t){var i={};function e(h){if(i[h])return i[h].exports;var s=i[h]={i:h,l:!1,exports:{}};return t[h].call(s.exports,s,s.exports,e),s.l=!0,s.exports}return e.m=t,e.c=i,e.d=function(t,i,h){e.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:h})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,i){if(1&i&&(t=e(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var h=Object.create(null);if(e.r(h),Object.defineProperty(h,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var s in t)e.d(h,s,function(i){return t[i]}.bind(null,s));return h},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="/dist/",e(e.s=3)}([function(t,i){t.exports=window.jQuery},,function(t,i,e){},function(t,i,e){"use strict";e.r(i),e.d(i,"OnOffSwitch",function(){return s});var h=e(0),s=(e(2),function(){function t(i){this.borderSize=0,this.isDragging=!1,this.hasBeenDragged=!1,this.inputEl=h(i.el),this.name=this.inputEl.attr("name"),this.params=i,t.switches[this.name]=this,t.switches["#"+this.inputEl.attr("id")]=this;var e=this.inputEl.attr("type");this.isCheckbox=e&&"checkbox"===e.toLowerCase(),this.isCheckbox?this.checked=this.inputEl.is(":checked"):this.checked=1===this.inputEl.val(),this.render()}return Object.defineProperty(t.prototype,"width",{get:function(){return this.params.width||0},set:function(t){this.params.width=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"trackBorderWidth",{get:function(){return this.params.trackBorderWidth||1},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"height",{get:function(){return this.params.height||30},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"trackBorderColor",{get:function(){return this.params.trackBorderColor||"#555"},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"textColorOff",{get:function(){return this.params.textColorOff||void 0},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"textColorOn",{get:function(){return this.params.textColorOn||void 0},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"textSizeRatio",{get:function(){return this.params.textSizeRatio||.4},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"trackColorOff",{get:function(){return this.params.trackColorOff||"#EEE"},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"trackColorOn",{get:function(){return this.params.trackColorOn},enumerable:!0,configurable:!0}),t.prototype.render=function(){if(0===this.width){var t=this.textSizeRatio/2,i=2+Math.max(this.params.textOff.length*t,this.params.textOn.length*t);this.width=this.height*i}this.inputEl.css("display","none"),this.el=h('<div class="on-off-switch" style="width:'+this.width+"px;height:"+this.height+'px"></div>'),this.inputEl.after(this.el),this.inputEl.on("change",this.listenToClickEvent.bind(this)),this.renderTrack(),this.renderThumb(),this.applyStyles(),this.track.on("click",this.toggle.bind(this)),this.track.on("touchend",this.toggle.bind(this)),this.addEvents()},t.prototype.addEvents=function(){this.thumb.on("mousedown",this.startDragging.bind(this)),this.thumb.on("touchstart",this.startDragging.bind(this)),this.thumb.on("mouseenter",this.enterThumb.bind(this)),this.thumb.on("mouseleave",this.leaveThumb.bind(this)),h(document.documentElement).on("touchmove",this.drag.bind(this)),h(document.documentElement).on("mousemove",this.drag.bind(this)),h(document.documentElement).on("mouseup",this.endDrag.bind(this)),h(document.documentElement).on("touchend",this.endDrag.bind(this))},t.prototype.listenToClickEvent=function(){this.inputEl.is(":checked")?this.checked||this.toggle():this.checked&&this.toggle()},t.prototype.enterThumb=function(){this.thumbColor.addClass("on-off-switch-thumb-over")},t.prototype.leaveThumb=function(){this.thumbColor.removeClass("on-off-switch-thumb-over")},t.prototype.renderTrack=function(){var t=this.width-2*this.trackBorderWidth,i=t-this.height/2;this.innerTrackWidth=t;var e=this.height-2*this.trackBorderWidth,s=this.height/2;this.track=h('<div class="on-off-switch-track" style="border-radius:'+s+"px;border-width:"+this.trackBorderWidth+"px;width:"+t+"px;height:"+e+'px"></div>'),this.trackBorderColor&&this.track.css("border-color",this.trackBorderColor),this.el.append(this.track),this.onOffTrackContainer=h('<div style="position:absolute;height:'+e+"px;width:"+2*i+'px"></div>'),this.track.append(this.onOffTrackContainer),this.trackOn=h('<div class="on-off-switch-track-on" style="border-radius:0px;border-width:'+this.trackBorderWidth+"px;width:"+i+"px;height:"+e+'px"><div class="track-on-gradient"></div></div>'),this.onOffTrackContainer.append(this.trackOn),this.onTextEl=h('<div class="on-off-switch-text on-off-switch-text-on">'+this.params.textOn+"</div>"),this.trackOn.append(this.onTextEl),this.textColorOn&&this.onTextEl.css("color",this.textColorOn),this.trackOff=h('<div class="on-off-switch-track-off" style="overflow:hidden;left:'+(i-this.height/2)+"px;border-radius:0px;border-width:"+this.trackBorderWidth+"px;width:"+this.width+"px;height:"+e+'px"><div class="track-off-gradient"></div></div>'),this.offTextEl=h('<div class="on-off-switch-text on-off-switch-text-off">'+this.params.textOff+"</div>"),this.onOffTrackContainer.append(this.trackOff),this.trackOff.append(this.offTextEl),this.textColorOff&&this.offTextEl.css("color",this.textColorOff),this.styleText(this.onTextEl),this.styleText(this.offTextEl);var r=this.height/2,o=r/2,n=o/2,a=this.width-2*n,c=h('<div class="on-off-switch-track-white" style="left:'+n+"px;width:"+a+"px;height:"+r+"px;border-radius:"+o+'px"></div>'),d=h('<div class="on-off-switch-track-white" style="left:'+n+"px;width:"+a+"px;height:"+r+"px;border-radius:"+o+'px"></div>');c.css("top",this.height/2),d.css("top",this.height/2),this.trackOn.append(c),this.trackOff.append(d),this.maxX=this.width-this.height},t.prototype.styleText=function(t){var i=Math.round(this.height*this.textSizeRatio),e=Math.round(this.width-this.height);t.css("line-height",this.height-2*this.trackBorderWidth+"px"),t.css("font-size",i+"px"),t.css("left",this.height/2+"px"),t.css("width",e+"px")},t.prototype.renderThumb=function(){var t=this.getBorderSize(),i=this.height-2*t,e=(this.height-this.height%2)/2;this.thumb=h('<div class="on-off-switch-thumb" style="width:'+this.height+"px;height:"+this.height+'px"></div>');var s=h('<div class="on-off-switch-thumb-shadow" style="border-radius:'+e+"px;width:"+i+"px;height:"+i+"px;border-width:"+t+'px;"></div>');this.thumb.append(s),this.thumbColor=h('<div class="on-off-switch-thumb-color" style="border-radius:'+e+"px;width:"+i+"px;height:"+i+"px;left:"+t+"px;top:"+t+'px"></div>'),this.thumb.append(this.thumbColor),this.trackColorOff&&this.trackOff.css("background-color",this.trackColorOff),this.trackColorOn&&this.trackOn.css("background-color",this.trackColorOn),this.el.append(this.thumb)},t.prototype.getBorderSize=function(){return 0===this.borderSize&&(this.borderSize=Math.round(this.height/40)),this.borderSize},t.prototype.applyStyles=function(){this.thumbColor.removeClass("on-off-switch-thumb-on"),this.thumbColor.removeClass("on-off-switch-thumb-off"),this.thumbColor.removeClass("on-off-switch-thumb-over"),this.checked?(this.thumbColor.addClass("on-off-switch-thumb-on"),this.thumb.css("left",this.width-this.height),this.onOffTrackContainer.css("left",0)):(this.onOffTrackContainer.css("left",this.getTrackPosUnchecked()),this.thumbColor.addClass("on-off-switch-thumb-off"),this.thumb.css("left",0)),this.isCheckbox?this.inputEl.prop("checked",this.checked):this.inputEl.val(this.checked?1:0)},t.prototype.startDragging=function(t){this.isDragging=!0,this.hasBeenDragged=!1;var i=this.thumb.position();return this.startCoordinates={x:this.getX(t),elX:i.left},!1},t.prototype.drag=function(t){if(!this.isDragging)return!0;this.hasBeenDragged=!0;var i=this.startCoordinates.elX+this.getX(t)-this.startCoordinates.x;return i<this.minX&&(i=this.minX),i>this.maxX&&(i=this.maxX),this.onOffTrackContainer.css("left",i-this.width+this.height),this.thumb.css("left",i),!1},t.prototype.getX=function(t){var i=t.pageX;return!t.type||"touchstart"!==t.type&&"touchmove"!==t.type||(i=t.originalEvent.touches[0].pageX),this.dragCurrentX=i,i},t.prototype.endDrag=function(){if(!this.isDragging)return!0;if(this.hasBeenDragged){var t=this.width/2-this.height/2;this.startCoordinates.elX+this.dragCurrentX-this.startCoordinates.x<t?this.animateLeft():this.animateRight()}else this.toggle();this.isDragging=!1},t.prototype.getTrackPosUnchecked=function(){return 0-this.width+this.height},t.prototype.animateLeft=function(){this.onOffTrackContainer.animate({left:this.getTrackPosUnchecked()},100),this.thumb.animate({left:0},100,"swing",this.uncheck.bind(this))},t.prototype.animateRight=function(){this.onOffTrackContainer.animate({left:0},100),this.thumb.animate({left:this.maxX},100,"swing",this.check.bind(this))},t.prototype.check=function(){this.checked||(this.checked=!0,this.notifyListeners()),this.applyStyles()},t.prototype.uncheck=function(){this.checked&&(this.checked=!1,this.notifyListeners()),this.applyStyles()},t.prototype.toggle=function(){this.checked?(this.checked=!1,this.animateLeft()):(this.checked=!0,this.animateRight()),this.notifyListeners()},t.prototype.notifyListeners=function(){this.params.listener&&this.params.listener.call(this,this.name,this.checked)},t.prototype.getValue=function(){return this.checked},t.switches={},t}())}]));