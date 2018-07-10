const fetch = require('node-fetch')

const url = `http://kodeturbo.com/index.php`
fetch(`${url}?do=turbo&oem=767378-0013`)
    .then(resp => resp.text())
    .then(console.log)