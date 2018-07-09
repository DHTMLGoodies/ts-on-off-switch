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

```json
   "compilerOptions": {
        "moduleResolution" : "node",
        ...
   }
```

Typescript:

```typescript
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
```html
<html>
<head>
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
        crossorigin="anonymous"></script>
    <script type="text/javascript" src="node_modules/ts-on-off-switch/dist/index.js"></script>
</head>

<body>
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
</body>
</html>
```

