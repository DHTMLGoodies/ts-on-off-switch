
import * as $ from "jquery";
import "../scss/OnOffSwitch.scss";

export interface IOnOffSwitchParams {
    el: JQuery<HTMLElement>;
    textOn: string;
    textOff: string;
    width?: number;
    height?: number;
    trackBorderWidth?: number;
    trackColorOn?: string;
    trackColorOff?: string;
    textColorOn?: string;
    textColorOff?: string;
    trackBorderColor?: string;
    textSizeRatio?: number;
    listener: (name: string, checked: boolean) => void;
}

export default class OnOffSwitch {

    private static switches: { [key: string]: OnOffSwitch } = {};

    private inputEl: JQuery<HTMLElement>;
    private el: JQuery<HTMLElement>;
    private track: JQuery<HTMLElement>;
    private thumb: JQuery<HTMLElement>;
    private thumbColor: JQuery<HTMLElement>;
    private trackOff: JQuery<HTMLElement>;
    private onTextEl: JQuery<HTMLElement>;
    private onOffTrackContainer: JQuery<HTMLElement>;
    private trackOn: JQuery<HTMLElement>;
    private offTextEl: JQuery<HTMLElement>;

    private name: string;
    private checked: boolean;
    private isCheckbox: boolean;
    private innerTrackWidth: number;

    private params: IOnOffSwitchParams;
    private maxX: number;
    private borderSize: number = 0;

    private minX: number = 0;

    constructor(params: IOnOffSwitchParams) {
        this.inputEl = $(params.el);
        this.name = this.inputEl.attr("name");

        this.params = params;

        OnOffSwitch.switches[this.name] = this;
        OnOffSwitch.switches["#" + this.inputEl.attr("id")] = this;

        const t = this.inputEl.attr("type");
        this.isCheckbox = t && t.toLowerCase() === "checkbox";
        if (this.isCheckbox) {
            this.checked = this.inputEl.is(":checked");
        } else {
            this.checked = this.inputEl.val() === 1;
        }

        this.render();
    }

    private get width() {
        return this.params.width || 0;
    }

    private set width(width: number) {
        this.params.width = width;
    }

    private get trackBorderWidth() {
        return this.params.trackBorderWidth || 1;
    }

    private get height() {
        return this.params.height || 30;
    }

    private get trackBorderColor() {
        return this.params.trackBorderColor || "#555";
    }

    private get textColorOff() {
        return this.params.textColorOff || undefined;
    }

    private get textColorOn() {
        return this.params.textColorOn || undefined;
    }

    private get textSizeRatio() {
        return this.params.textSizeRatio || .4;
    }

    private get trackColorOff() {
        return this.params.trackColorOff || "#EEE";
    }

    private get trackColorOn() {
        return this.params.trackColorOn;
    }


    private render() {

        if (this.width === 0) {
            const ratio = this.textSizeRatio / 2;
            const widthFactor = 2 + Math.max(this.params.textOff.length * ratio, this.params.textOn.length * ratio);
            this.width = this.height * widthFactor;
        }

        this.inputEl.css("display", "none");
        this.el = $('<div class="on-off-switch" style="width:' + this.width + 'px;height:' + this.height + 'px"></div>');
        this.inputEl.after(this.el);

        this.inputEl.on("change", this.listenToClickEvent.bind(this));

        this.renderTrack();
        this.renderThumb();

        this.applyStyles();


        this.track.on("click", this.toggle.bind(this));
        this.track.on("touchend", this.toggle.bind(this));

        this.addEvents();
    }

    private addEvents() {
        this.thumb.on("mousedown", this.startDragging.bind(this));
        this.thumb.on("touchstart", this.startDragging.bind(this));

        this.thumb.on("mouseenter", this.enterThumb.bind(this));
        this.thumb.on("mouseleave", this.leaveThumb.bind(this));

        $(document.documentElement).on("touchmove", this.drag.bind(this));
        $(document.documentElement).on("mousemove", this.drag.bind(this));
        $(document.documentElement).on("mouseup", this.endDrag.bind(this));
        $(document.documentElement).on("touchend", this.endDrag.bind(this));
    }

    private listenToClickEvent() {
        if (this.inputEl.is(':checked')) {
            if (!this.checked) this.toggle();
        } else {
            if (this.checked) this.toggle();
        }
    }

    private enterThumb() {
        this.thumbColor.addClass("on-off-switch-thumb-over");
    }

    leaveThumb() {
        this.thumbColor.removeClass("on-off-switch-thumb-over");
    }

    renderTrack() {
        var trackWidth = this.width - (this.trackBorderWidth * 2);
        var innerTrackWidth = trackWidth - (this.height / 2);
        this.innerTrackWidth = trackWidth;
        var trackHeight = this.height - (this.trackBorderWidth * 2);
        var borderWidth = this.height / 2;


        this.track = $('<div class="on-off-switch-track" style="border-radius:' + borderWidth + 'px;border-width:' + this.trackBorderWidth + 'px;' +
            'width:' + trackWidth + 'px;' +
            'height:' + trackHeight + 'px"></div>');

        if (this.trackBorderColor) {
            this.track.css("border-color", this.trackBorderColor);
        }
        this.el.append(this.track);

        this.onOffTrackContainer = $('<div style="position:absolute;height:' + trackHeight + 'px;width:' + (innerTrackWidth * 2) + 'px"></div>');
        this.track.append(this.onOffTrackContainer);


        this.trackOn = $('<div class="on-off-switch-track-on" style="border-radius:' + 0 + 'px;border-width:' + this.trackBorderWidth + 'px;width:' + innerTrackWidth + 'px;height:' + trackHeight + 'px"><div class="track-on-gradient"></div></div>');
        this.onOffTrackContainer.append(this.trackOn);
        this.onTextEl = $('<div class="on-off-switch-text on-off-switch-text-on">' + this.params.textOn + '</div>');
        this.trackOn.append(this.onTextEl);

        if (this.textColorOn) {
            this.onTextEl.css("color", this.textColorOn);
        }

        this.trackOff = $('<div class="on-off-switch-track-off" style="overflow:hidden;left:' + (innerTrackWidth - (this.height / 2)) + 'px;border-radius:' + 0 + 'px;border-width:' + this.trackBorderWidth + 'px;width:' + this.width + 'px;height:' + trackHeight + 'px"><div class="track-off-gradient"></div></div>');
        this.offTextEl = $('<div class="on-off-switch-text on-off-switch-text-off">' + this.params.textOff + '</div>');
        this.onOffTrackContainer.append(this.trackOff);
        this.trackOff.append(this.offTextEl);

        if (this.textColorOff) {
            this.offTextEl.css("color", this.textColorOff);
        }

        this.styleText(this.onTextEl);
        this.styleText(this.offTextEl);

        var whiteHeight = this.height / 2;
        var whiteBorderRadius = whiteHeight / 2;
        var horizontalOffset = whiteBorderRadius / 2;
        var whiteWidth = this.width - (horizontalOffset * 2);

        var whiteEl = $('<div class="on-off-switch-track-white" style="left:' + horizontalOffset + 'px;width:' + whiteWidth + 'px;height:' + whiteHeight + 'px;border-radius:' + whiteBorderRadius + 'px"></div>');
        var whiteEl2 = $('<div class="on-off-switch-track-white" style="left:' + horizontalOffset + 'px;width:' + whiteWidth + 'px;height:' + whiteHeight + 'px;border-radius:' + whiteBorderRadius + 'px"></div>');
        whiteEl.css("top", this.height / 2);
        whiteEl2.css("top", this.height / 2);
        this.trackOn.append(whiteEl);
        this.trackOff.append(whiteEl2);


        this.maxX = this.width - this.height;
    }

    private styleText(el: JQuery<HTMLElement>) {
        var textHeight = Math.round(this.height * this.textSizeRatio);
        var textWidth = Math.round(this.width - this.height);

        el.css("line-height", (this.height - (this.trackBorderWidth * 2)) + "px");
        el.css("font-size", textHeight + "px");
        el.css("left", (this.height / 2) + "px");
        el.css("width", textWidth + "px");
    }

    renderThumb() {

        var borderSize = this.getBorderSize();

        var size = this.height - (borderSize * 2);
        var borderRadius = (this.height - this.height % 2) / 2;


        this.thumb = $('<div class="on-off-switch-thumb" style="width:' + this.height + 'px;height:' + this.height + 'px"></div>');


        var shadow = $('<div class="on-off-switch-thumb-shadow" style="border-radius:' + borderRadius + 'px;width:' + size + 'px;height:'
            + size + 'px;border-width:' + borderSize + 'px;"></div>');

        this.thumb.append(shadow);

        this.thumbColor = $('<div class="on-off-switch-thumb-color" style="border-radius:' + borderRadius + 'px;width:' + size + 'px;height:' + size +
            'px;left:' + borderSize + 'px;top:' + borderSize + 'px"></div>');
        this.thumb.append(this.thumbColor);

        if (this.trackColorOff) {
            this.trackOff.css("background-color", this.trackColorOff);
        }
        if (this.trackColorOn) {
            this.trackOn.css("background-color", this.trackColorOn);
        }

        this.el.append(this.thumb);
    }


    getBorderSize() {
        if (this.borderSize === 0) {
            this.borderSize = Math.round(this.height / 40);
        }
        return this.borderSize;
    }

    private applyStyles() {

        this.thumbColor.removeClass("on-off-switch-thumb-on");
        this.thumbColor.removeClass("on-off-switch-thumb-off");
        this.thumbColor.removeClass("on-off-switch-thumb-over");


        if (this.checked) {
            this.thumbColor.addClass("on-off-switch-thumb-on");
            this.thumb.css("left", this.width - this.height);
            this.onOffTrackContainer.css("left", 0);
        }
        else {
            this.onOffTrackContainer.css("left", this.getTrackPosUnchecked());
            this.thumbColor.addClass("on-off-switch-thumb-off");
            this.thumb.css("left", 0);
        }
        if (this.isCheckbox) {
            this.inputEl.prop('checked', this.checked);
        } else {
            this.inputEl.val(this.checked ? 1 : 0);
        }
    }

    private isDragging: boolean = false;
    hasBeenDragged: boolean = false;
    private startCoordinates: {
        x: number;
        elX: number;
    };

    private startDragging(e: JQuery.Event<HTMLElement>) {


        this.isDragging = true;
        this.hasBeenDragged = false;
        var position = this.thumb.position();

        this.startCoordinates = {
            x: this.getX(e),
            elX: position.left
        };
        return false;
    }

    private drag(e: JQuery.Event<HTMLElement>) {
        if (!this.isDragging) {
            return true;
        }

        this.hasBeenDragged = true;
        var x = this.startCoordinates.elX + this.getX(e) - this.startCoordinates.x;

        if (x < this.minX) x = this.minX;
        if (x > this.maxX) x = this.maxX;

        this.onOffTrackContainer.css("left", x - this.width + (this.height));
        this.thumb.css("left", x);
        return false;
    }

    private dragCurrentX: number;

    private getX(e: JQuery.Event<HTMLElement>) {
        var x = e.pageX;

        if (e.type && (e.type === "touchstart" || e.type === "touchmove")) {
            x = (<any>e.originalEvent).touches[0].pageX;
        }

        this.dragCurrentX = x;

        return x;
    }

    private endDrag() {
        if (!this.isDragging) return true;

        if (!this.hasBeenDragged) {
            this.toggle();
        } else {
            var center = this.width / 2 - (this.height / 2);
            var x = this.startCoordinates.elX + this.dragCurrentX - this.startCoordinates.x;
            if (x < center) {
                this.animateLeft();
            } else {
                this.animateRight();
            }
        }
        this.isDragging = false;
    }

    private getTrackPosUnchecked() {
        return 0 - this.width + this.height;
    }

    private animateLeft() {
        this.onOffTrackContainer.animate({ left: this.getTrackPosUnchecked() }, 100);
        this.thumb.animate({ left: 0 }, 100, "swing", this.uncheck.bind(this));
    }

    private animateRight() {
        this.onOffTrackContainer.animate({ left: 0 }, 100);
        this.thumb.animate({ left: this.maxX }, 100, "swing", this.check.bind(this));
    }

    check() {
        if (!this.checked) {
            this.checked = true;
            this.notifyListeners();
        }
        this.applyStyles();
    }

    uncheck() {
        if (this.checked) {
            this.checked = false;
            this.notifyListeners();
        }
        this.applyStyles();
    }

    toggle() {
        if (!this.checked) {
            this.checked = true;
            this.animateRight();
        } else {
            this.checked = false;
            this.animateLeft();
        }

        this.notifyListeners();
    }

    private notifyListeners() {
        if (this.params.listener) {
            this.params.listener.call(this, this.name, this.checked);
        }
    }

    getValue() {
        return this.checked;
    }

}
