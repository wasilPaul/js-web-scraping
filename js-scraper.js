const fetch = require('node-fetch')
const cheerio = require('cheerio')

const url = [`http://kodeturbo.com/index.php`, `?marka=`, `?do=cars2&marka=`,`&do=cars`, `&model=`]

const searchTurbin = `?do=turbo&oem=` // turbin search url+search+idNumber


// function resarch all marks on website
function searchAllSerialNumbers() {

    const allMarks = []
    let modelType = []
    const allTurb = []

    fetch(`${url[0]}${url[1]}Alpina${url[3]}`)
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
        .then(() => modelType = allMarks.map(x => x[2].trim().replace(/ /gi, '%20')))
        .then(() => console.log(modelType))
        .then(() => fetch(`${url[0]}${url[2]}Alpina${url[4]}${modelType[1]}`)
            .then(resp => resp.text())
            .then(body => {
                const $ = cheerio.load(body)
                $(`a`).each(function (i, turb) {
                    const $turb = $(turb)
                    allTurb.push([modelType[1],$turb.text()])
                })
                console.log(allTurb.filter(x => x[1] != ''))
                return allTurb 
            }))
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

