process.send({test: 'check'})
setTimeout(function () { process.send({test: 'passed'}) }, 100)
