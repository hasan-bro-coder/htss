# HTSS
![NPM Version](https://img.shields.io/npm/v/htss?style=flat)
![NPM Downloads](https://img.shields.io/npm/dt/htss?style=flat)
![Static Badge](https://img.shields.io/badge/size-3.27kb-red)



htss is a way to write html like CSS

made for css lovers *(No one)*

Installation
------------
### CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/htss@1.0.3/htss-min.js"></script>
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
- will make you star this repo **(DO IT)**

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
what is attr ??
```css
div{
     innerText: "js element proparty"; /* div.innerText = "%value%" */
     attr-class: "HTML atrribute" /* <div class="%value%"></div> */
}
```
child elements
```css
div{
  h1{
       innerText: "im a child ";
       span{
            innerText: "element"
            style: "color:red"
       }
  }
}
```
Cool tricks:
-------
because you have to use htss from js you have many cool trick to do

dynamic data:
```js
let htss = ""
for(let i=0;i < 10;i++){
  htss += `div{
    innerText: "${i}.dynamic data"; 
    style: "color: #${i}${i}${i}000;"
}`
}
new HTSS(htss,document.body)
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
