const fetch = require('node-fetch')
const cheerio = require('cheerio')

const url = `http://kodeturbo.com/index.php`

const searchTurbin = `?do=turbo&oem=` // turbin search url+search+idNumber

//?marka=Chevrolet&do=cars
//${url}

// function resarch all marks on website
function searchMarks() {
    const allMarks = []
    let blala = []
    const allTurb = []
    fetch(`http://kodeturbo.com/index.php?marka=Alpina&do=cars`)
        .then(resp => resp.text())
        .then(body => {
            const $ = cheerio.load(body)
            $(`tr`).each(function (i, mark) {
                const $mark = $(mark)
                allMarks.push($mark.text().split('\n'))  //.replace(/ /gi, '%20'))
            })
            //console.log(allMarks)
            return allMarks
        })
        .then(() => blala = allMarks.map(x => x[2].trim().replace(/ /gi, '%20')))
        .then(() => console.log(blala))
        .then(() => fetch(`http://kodeturbo.com/index.php?do=cars2&marka=Alpina&model=${blala[1]}`)
            .then(resp => resp.text())
            .then(body => {
                const $ = cheerio.load(body)
                $(`a`).each(function (i, turb) {
                    const $turb = $(turb)
                    allTurb.push($turb.text())
                })
                console.log(allTurb)
                return allTurb
            }))
}
searchMarks()






// function searchMarks(mark) {
//     const searchingMark = `?marka=`
//     const car = `&do=cars`
//     return fetch(`${url}${searchingMark}${mark}${car}`)
//         .then(resp => resp.text())
// }

// searchMarks()
//     .then(body => {
//         const $ = cheerio.load(body)
//         $(`option`).each(function (i, e) {
//             const $e = $(e)
//             allMarks.push($e.text())
//         })
//         console.log(allMarks)
//         return allMarks
//     })

