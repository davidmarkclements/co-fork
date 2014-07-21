var co = require('co');
var thunkify = require('thunkify');
var fork = require("child_process").fork;

function cont(obj, meth) {
  return (function (fn) {
    return function (type, cb) { 
      fn.call(obj, type, function (val) {
        cb(null, val);
      })
    }
  }(obj[meth]));
}

module.exports = function () {
  var proc = fork.apply(fork, Array.prototype.slice.call(arguments));
  
  var on = thunkify(cont(proc, 'on')); 

  proc.on = on; 
  proc.addListener = proc.on;
  proc.once = (function (once) { 
    return thunkify(function (type, cb) {

      this.on = this.__proto__.on;

      once.call(proc, type, function (val) {
        cb(null, val);
      })

      this.on = on;
    }.bind(proc));
  }(proc.once));

  return proc;
}



