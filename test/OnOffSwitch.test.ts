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
        assert.ok(onOffSwitch);

    });


});