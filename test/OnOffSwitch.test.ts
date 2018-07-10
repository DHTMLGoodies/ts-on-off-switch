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
            listener: (checked: boolean, name: string) => {

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
            listener: (checked: boolean, name: string) => {
                triggeredName = name;
                triggeredValue = checked;

            }
        });

        // when
        onOffSwitch.checked = true;

        // then
        assert.equal(triggeredName, "checkbox");
        assert.isTrue(triggeredValue);

        // when
        onOffSwitch.checked = false;

        // then
        assert.isFalse(triggeredValue);
    });

    it("Should toggle on click", () => {
        let checked: boolean;
        let onOffSwitch = new OnOffSwitch({
            el: $('<input type="checkbox" name="checkbox" checked>'),
            textOn: "on",
            textOff: "off",
            listener: (c: boolean) => {
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
            listener: (c: boolean, name: string) => {
                checked = c;
            }
        });

        // when
        onOffSwitch.checked = false;

        // then
        assert.isFalse(onOffSwitch.checked);


    });
});