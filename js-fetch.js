const fetch = require('node-fetch')
const cheerio = require('cheerio')
const fs = require('fs')

const url = [`http://kodeturbo.com/index.php`, `?marka=`, `?do=cars2&marka=`, `&do=cars`, `&model=`, `?do=turbo&oem=`]
const allBrands = []
let allModels = []
let allParameters = []

async function getBrands() {
    const brands = await fetch(`${url[0]}`)
        .then(resp => resp.text())
    const $ = cheerio.load(brands)
    $(`option`).each(function (i, brand) {
        const $brand = $(brand)
        allBrands.push($brand.text())
        
        return allBrands
    })
    fs.writeFile(`./brands.json`, JSON.stringify(allBrands, null, 2))
    console.log(allBrands)
}

function getModels() {
    const inAllModels = []
    allBrands.forEach(async function (brand) {
        const model = await fetch(`${url[0]}${url[1]}${brand}${url[3]}`).then(resp => resp.text())
        const $ = cheerio.load(model)
        $(`tr`).each(function (i, model) {
            if (i != 0) {
                const $model = $(model)
                inAllModels.push($model.text().split('\n'))
            }
            //return inAllModels
        })
        allModels = inAllModels
            .map(x =>
                x.map(x =>
                    x.trim()).filter(x => x != ''))
            .map((x,i) => { return { nr: i, marka: x[0], model: x[1].replace(/ /gi, '%20') } })
        console.log(allModels)
        fs.writeFile(`./Models.json`, JSON.stringify(allModels, null, 2))
        return allModels
        
    })
}
//http://kodeturbo.com/index.php?do=cars2&marka=Alfa-Romeo&model=145%201.9%20JTD

function getModelsParameters() {
    inAllParameters = []
    allModels.forEach(async function (model) {
        const parameter = await fetch(`${url[0]}${url[2]}${model.marka}${url[4]}${model.model}`).then(resp => resp.text())
        console.log(parameter)
        const $ = cheerio.load(parameter)
        $(`tr`).each(function (i, parameter) {
            const $parameter = $(parameter)
            if (i != 0) {
                inAllParameters.push($parameter.text())
            }
            console.log(inAllParameters)

            return inAllParameters
        })
    })
}

async function getALL() {
    await getBrands()
    await getModels()
    // await getModelsParameters()

}

getALL()

