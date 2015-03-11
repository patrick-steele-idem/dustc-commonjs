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
            expect(src).to.equal('var dust = require(\'dustjs-linkedin\');(function(dust){module.exports=body_0;function body_0(chk,ctx){return chk.w("Hello ").f(ctx.get(["name"], false),ctx,"h").w("!");}body_0.__dustBody=!0;return body_0;})(dust);');
            done();
        });
    });
});
