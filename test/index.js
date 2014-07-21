var fork = require('../index')
var co = require('co');
var assert = require('assert');

function test(meth) {
	var proc = fork('./test/process');

	co(function *() {
		var msg = yield proc[meth]('message');
		assert('passed', msg.test)
		console.log(meth, msg);
	})();
}

test('addListener');
test('on')
test('once');

function testMulti(meth) {
  var proc = fork('./test/process/multi');

  co(function *() {
    var msg = yield proc[meth]('message');
    assert('check', msg.test)
    console.log('multi', meth, msg);
    msg = yield proc[meth]('message');
    assert('passed', msg.test)
    console.log('multi', meth, msg);
  })();
}

testMulti('on')
testMulti('addListener')
testMulti('once')
