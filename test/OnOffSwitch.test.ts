import { assert } from "chai";
import { OnOffSwitch } from "../src/OnOffSwitch";
import * as $ from "jquery";


describe("MinMaxSlider", () => {

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
});