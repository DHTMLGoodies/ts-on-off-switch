import { assert } from "chai";
import { OnOffSwitch } from "../lib/index";
import * as $ from "jquery";


describe("OnOffSwitch", () => {

    beforeEach(() => {

    });

    it("Should work", () => {
        let onOffSwitch = new OnOffSwitch({
            el: $('<input type="checkbox" name="checkbox">'),
            textOn: "on",
            textOff: "off",
            listener: (name: string, checked: boolean) => {

            }
        });

        // then
        assert.exists(onOffSwitch);
    });

    it("should trigger callback", () => {
        let triggeredName: string;
        let triggeredValue: boolean;
        let onOffSwitch = new OnOffSwitch({
            el: $('<input type="checkbox" name="checkbox">'),
            textOn: "on",
            textOff: "off",
            listener: (name: string, checked: boolean) => {
                triggeredName = name;
                triggeredValue = checked;

            }
        });

        // when
        onOffSwitch.check();

        // then
        assert.equal(triggeredName, "checkbox");
        assert.isTrue(triggeredValue);

        // when
        onOffSwitch.uncheck();

        // then
        assert.isFalse(triggeredValue);
    });

    it("Should toggle on click", () => {
        let checked: boolean;
        let onOffSwitch = new OnOffSwitch({
            el: $('<input type="checkbox" name="checkbox" checked>'),
            textOn: "on",
            textOff: "off",
            listener: (name: string, c: boolean) => {
                checked = c;
            }
        });
        assert.isTrue(onOffSwitch.checked);

        // when
        onOffSwitch.$.find(".on-off-switch-track").trigger("click");

        // then
        assert.isFalse(onOffSwitch.checked);

        // when
        onOffSwitch.$.find(".on-off-switch-track").trigger("click");

        // then
        assert.isTrue(onOffSwitch.checked);

    });

    it("Should be able to set checked", () => {
        // given
        let checked: boolean;
        let onOffSwitch = new OnOffSwitch({
            el: $('<input type="checkbox" name="checkbox" checked>'),
            textOn: "on",
            textOff: "off",
            listener: (name: string, c: boolean) => {
                checked = c;
            }
        });

        // when
        onOffSwitch.checked = false;

        // then
        assert.isFalse(onOffSwitch.checked);


    });
});