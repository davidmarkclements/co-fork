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

