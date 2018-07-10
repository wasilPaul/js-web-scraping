const fetch = require('node-fetch')

const url = `http://kodeturbo.com/index.php`

const searchTurbin = `?do=turbo&oem=` // turbin search url+search+idNumber

const allMarks = []  //?marka=Chevrolet&do=cars


function searchMarks(mark) {
    const searchingMark = `?marka=`
    const car = `&do=cars`
    return fetch(`${url}${searchingMark}${mark}${car}`)
        .then(resp => resp.text())
}


searchMarks(`Alfa-Romeo`).then(console.log)