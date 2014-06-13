'use strict';
var chai = require('chai');
chai.Assertion.includeStack = true;
require('chai').should();
var expect = require('chai').expect;
var nodePath = require('path');
var compiler = require('../');

describe('dustc-commonjs' , function() {

    beforeEach(function(done) {
        // for (var k in require.cache) {
        //     if (require.cache.hasOwnProperty(k)) {
        //         delete require.cache[k];
        //     }
        // }

        done();
    });

    it('should render a raptor template with a callback', function(done) {
        compiler.compileFile(nodePath.join(__dirname, 'test.dust'), function(err, src) {
            if (err) {
                return done(err);
            }
            expect(src).to.equal('(function(){module.exports=body_0;function body_0(chk,ctx){return chk.write("Hello ").reference(ctx.get(["name"], false),ctx,"h").write("!");}return body_0;})();');
            done();
        });
    });
});

