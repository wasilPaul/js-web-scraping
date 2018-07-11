const fetch = require('node-fetch')
const cheerio = require('cheerio')


const url = [`http://kodeturbo.com/index.php`, `?marka=`, `?do=cars2&marka=`, `&do=cars`, `&model=`, `?do=turbo&oem=`]



async function getMA() {

    const allMarks = await fetch(`${url[0]}`)
        .then(resp => resp.text())

    const $ = cheerio.load(allMarks)
    
    $(`option`).each(function (i, mark) {
        const $mark = $(mark)
        const bk = []
        bk.push($mark.text())
        console.log(bk)
        return bk
    })
    
}



getMA()
