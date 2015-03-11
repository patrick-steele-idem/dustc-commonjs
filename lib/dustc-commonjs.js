var dustPath;
var defaultDust;

try {
    dustPath = require.resolve('dustjs-linkedin');
} catch(e) {
    dustPath = null;
}

if (dustPath) {
    defaultDust = require('dustjs-linkedin');
}

var fs = require('fs');
var registerRegExp = /dust\.register\s*\(\s*['"]%TEMPLATE%['"]\s*,\s*([^\)]+)\)/g;

//dust.register("%TEMPLATE%",body_0)sdfsdf

exports.compile = function(src, options, callback) {
    if (typeof options === 'function') {
        callback = options;
        options = {};
    }

    var dust = options.dust || defaultDust;

    if (!dust) {
        throw new Error('Unable to compile Dust template. The "dustjs-linkedin" module was not found. This module should be installed as a top-level application module');
    }

    try {
        var compiledSrc = dust.compile(src, '%TEMPLATE%');
        compiledSrc = compiledSrc.replace(registerRegExp, function(match, funcName) {
            return 'module.exports=' + funcName;
        });
        compiledSrc = 'var dust = require(\'dustjs-linkedin\');' + compiledSrc;
        callback(null, compiledSrc);
    } catch(e) {
        callback(e);
    }

};

exports.compileFile = function(path, options, callback) {
    if (typeof options === 'function') {
        callback = options;
        options = {};
    }

    var dust = options.dust || defaultDust;

    if (!dust) {
        throw new Error('Unable to compile Dust template at path "' + path + '". The "dustjs-linkedin" module was not found. This module should be installed as a top-level application module');
    }
    fs.readFile(path, 'utf8', function(err, src) {
        if (err) {
            return callback(err);
        }

        exports.compile(src, callback);

    });
};
