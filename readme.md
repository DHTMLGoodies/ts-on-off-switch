# JQuery On-Off Switch written in Typescript

JQuery widget which transforms 
```html
<input type="checkbox"> 
```
into a visual On/Off switch.
```
npm install ts-on-off-switch --save
```


Example :

Set module resolution to node in tsconfig.json

```
   "compilerOptions": {
        "moduleResolution" : "node",
        ...
   }
```

Typescript:

```
import * as $ from "jquery";

import { OnOffSwitch } from "ts-on-off-switch";

export class TestClass {

    constructor() {
        let el = new OnOffSwitch({
            textOn: "on",
            textOff: "off",
            el: $('#mycheckbox'),
            listener: (name: string, checked: boolean) => {

            }
        });
    }
}
```

HTML
```
    <div class="checkbox-container">
        <input type="checkbox" id="on-off-switch" name="switch1" checked>
    </div>
    <div id="listener-text">

    </div>
    <script type="text/javascript">
        new OnOffSwitch({
            el: '#on-off-switch',
            textOn: 'Sync On',
            textOff: 'Off',
            listener: function (name, checked) {
                $("#listener-text").html("Listener called for " + name + ", checked: " + checked);
            }
        });
    </script>
```

