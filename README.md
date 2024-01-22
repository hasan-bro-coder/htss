# HTSS
![NPM Version](https://img.shields.io/npm/v/htss?style=flat)
![NPM Downloads](https://img.shields.io/npm/dt/htss?style=flat)
![Static Badge](https://img.shields.io/badge/size-3.67kb-red)



htss is a way to write html like CSS

made for css lover *(No one)*

Installation
------------
### CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/htss@1.0.1/htss-min.js"></script>
```

Example:
```html
<script src="https://cdn.jsdelivr.net/npm/htss@1.0.1/htss-min.js"></script>

<script>
new HTSS("#element",`
     div{
       innerText: "welcome to htss";
       attr-style: "font-family: monospace;";
     }
`)
</script>
```
### ESModule:
```bash
npm install htss
```
Example:
```js
import { HTSS } from "htss"

new HTSS("#element",`
     div{
       innerText: "from js using ESMODULE";
       attr-style: "font-family: monospace;";
     }
`)
```
Features
--------

- only **3.67 KB**
- dynamic data
- fast and simple
- packed with many features
- will make you hate css more

easy it is to use:
-------
```js
new HTSS(`
     form{
        input{
          value: "placeholder";
        }
        button{
          innerText: "submit";
        }
     }
`,document.body)
```


More About HTSS
----------
unlike css **semicolons are optional**
```css
div{
     innerText: "CSS is better than HTSS"; /* with semicolon */
     innerText: "HTSS is better than CSS" /* without semicolon */
}
```


Support
-------

If you are having issues, please let us know.
discord: https://discord.gg/mnBc7hnf


License
-------

The project is licensed under the ISC license.

Author
-------

**HSN-BRO-CODER**
