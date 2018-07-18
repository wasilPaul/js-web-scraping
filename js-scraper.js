const fetch = require('node-fetch')
const cheerio = require('cheerio')
const fs = require('fs')

const url = [`http://kodeturbo.com/index.php`, `?marka=`, `?do=cars2&marka=`, `&do=cars`, `&model=`, `?do=turbo&oem=`]

// function resarch all marks on website
function searchAllSerialNumbers() {

    const allMarks = []
    let modelType = []


    fetch(`${url[0]}${url[1]}Alpina${url[3]}`)
        .then(resp => resp.text())
        .then(body => {
            const $ = cheerio.load(body)
            $(`tr`).each(function (i, mark) {
                const $mark = $(mark)
                allMarks.push($mark.text().split('\n'))
            })
            //console.log(allMarks)
            return allMarks
        })
        .then(() => modelType = allMarks.map(x => x[2].trim().replace(/ /gi, '%20')))
        .then(() => console.log(modelType))
        .then(() => modelType.forEach(x => fetch(`${url[0]}${url[2]}Alpina${url[4]}${x}`)
            .then(resp => resp.text())
            .then(body => {
                const allTurb = []
                const $ = cheerio.load(body)
                $(`a`).each(function (i, turb) {
                    const $turb = $(turb)
                    allTurb.push({model: x, turb: $turb.text()})
                })
                console.log(allTurb.filter(x => x.turb != ''))
                return allTurb
            })))
}
searchAllSerialNumbers()






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

//po kolei ściągnij zapisz do pliku pobierz 