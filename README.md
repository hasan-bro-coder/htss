# HTSS
![NPM Version](https://img.shields.io/npm/v/htss?style=flat)
![NPM Downloads](https://img.shields.io/npm/dt/htss?style=flat)
![GitHub commit activity](https://img.shields.io/github/commit-activity/t/hasan-bro-coder/htss?style=flat&color=880000)


htss is a way to write html like CSS
made for css lover *(No one)*

Installation
------------
### CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/htss@1.0.1/htss-min.js"></script>
```

for direct use in HTML
```html
<script src="https://cdn.jsdelivr.net/npm/htss@1.0.1/htss-min.js"></script>

<script>
new HTSS("#element",`
     div{
       innerText: "yo"
       attr-style: "color: red"
       attr-class: "main"
       nav{
           innerText: "yo"
       }
     }
     input{
       innerText: "yo"
       className: "main"
       value: "niger"
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
       innerText: "from js using ESMODULE"
       attr-style: "font-family: monospace;"
     }
`)
```
Features
--------

- fast and simple
- only 3.5 kb
- packed with many features

easy it is to use:
-------
```js
new HTSS(`
     div{
       innerText: "yo"
       attr-style: "color: red"
       attr-class: "main"
       nav{
           innerText: "yo"
       }
     }
     input{
       innerText: "yo"
       className: "main"
       value: "niger"
     }
`,document.body)
```


More About HTSS
----------



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
