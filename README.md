## co-fork

Recieve asynchrous messages from forked processes 
using ES6 yield instead of using callback functions.

Built for and tested with [co](https://www.npmjs.org/package/co), but doesn't depend on it. 
It should also work with the likes of suspend, gen-run, etc.

### Install

```
npm install co-fork
```


### Example

Using co (`npm i co`)

#### child.js

```
process.send({hello: '...everybody :)'});
```

#### master.js
```
var fork = require('co-fork');
var co = require('co');
var child = fork('./child.js');

co(function *() {
  var msg = yield child('message');
  console.log(msg);
})();
```

### Running the Example
Works with Node v0.11.x and v0.10.x (with a little extra effort)

#### Node v0.11.x and above

```
node --harmony master.js
```

#### Node v0.10.x and below
We can run our example code in v0.10.x using traceur

First install traceur

```
npm i traceur
```

Then create a file, master.transpile.js

```
var Traceur = require('traceur');

Traceur.require.makeDefault(function(filename) {  
  return !(/node_modules\/traceur/.test(filename));
});

require('./master')
```

This causes any required modules to be transpiled from
es6 to es5 (except traceur itself). We then require
the master.js file to transpile it (and it's dependencies), 
and then execute it. 

Now we can run our code in v0.10.x with

```
node master.transpile.js
```

### Testing

```
npm test
```

This will work seamlessly whether node version is
above or below v0.11.x






