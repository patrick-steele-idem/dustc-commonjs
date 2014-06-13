dustc-commonjs
==================

Transforms a compiled Dust template to a CommonJS module

# Installation

```
npm install dustc-commonjs --save
```

# Why?

Standard Dust modules compile down to JavaScript code that registers a compiled template function using a given _template name_ and the compiled output assumes that there is a global `dust` variable (globals are evil). By producing a CommonJS module as output the template can be loaded using the standard Node.js module loading system based on `require`.

# Usage

Given the following sample template:

```html
Hello {name}!
```

And the following sample program:

```javascript
var templatePath = require('path').join(__dirname, 'hello.dust');
require('dustc-commonjs').compileFile(templatePath, function(err, src) {
    if (err) {
        // Handle the error
        return;
    }

    // src will be the compiled JavaScript code for the Dust template as a CommonJS module
})
```

The output compiled template will be similar to the following:

```javascript
(function(){module.exports=body_0;function body_0(chk,ctx){return chk.write("Hello ").reference(ctx.get(["name"], false),ctx,"h").write("!");}return body_0;})();
```

Notice the usage of `module.exports`.

In comparison, the standard compiled output (that is _not) a CommonJS module) will be similar to the following:

```javascript
(function(){module.exports=body_0;function body_0(chk,ctx){return chk.write("Hello ").reference(ctx.get(["name"], false),ctx,"h").write("!");}return body_0;})();
```