const fetch = require('node-fetch')
const cheerio = require('cheerio')

const url = [`http://kodeturbo.com/index.php`, `?marka=`, `?do=cars2&marka=`, `&do=cars`, `&model=`, `?do=turbo&oem=`]
const allBrands = []
let allMarks = []

async function getBrands() {
    const brands = await fetch(`${url[0]}`)
        .then(resp => resp.text())
    const $ = cheerio.load(brands)
    $(`option`).each(function (i, brand) {
        const $brand = $(brand)
        allBrands.push($brand.text())
        return allBrands
    })
    console.log(allBrands)
}


function getModel() {
    const inAllMarks = []
    allBrands.forEach(async function (brand) {

        const mark = await fetch(`${url[0]}${url[1]}${brand}${url[3]}`).then(resp => resp.text())
        const $ = cheerio.load(mark)
        $(`tr`).each(function (i, mark) {
            if (i != 0) {
                const $mark = $(mark)
                inAllMarks.push($mark.text().split('\n'))
            }
            return inAllMarks
        })
        allMarks = inAllMarks.map(x =>
            x.map(x =>
                x.trim()).filter(x => x != ''))
        console.log(allMarks)

    })
}

async function getALL() {
    await getBrands()
    await getModel()
}

getALL()