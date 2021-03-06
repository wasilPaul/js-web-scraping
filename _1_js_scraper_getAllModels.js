const fetch = require('node-fetch')
const cheerio = require('cheerio')
const fs = require('fs')

const url = [`http://......com/index.php`, `?marka=`, `?do=cars2&marka=`, `&do=cars`, `&model=`, `?do=turbo&oem=`]
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
  fs.writeFile(`./data/Brands.json`, JSON.stringify(allBrands, null, 2), (err) => {
    if (err) throw err;
    console.log('The file has been saved!')
  })
  console.log(allBrands)
}

function getModels() {
  const inAllModels = []
  allBrands.forEach(async function (brand) {
    const model = await fetch(`${url[0]}${url[1]}${brand}${url[3]}`).then(resp => resp.text())
    const $ = await cheerio.load(model)
    $(`tr`).each(function (i, model) {
      if (i != 0) {
        const $model = $(model)
        inAllModels.push($model.text().split('\n'))
      }
      return inAllModels
    })
    allModels = inAllModels
      .map(x =>
        x.map(x =>
          x.trim()).filter(x => x != ''))
      .map((x, i) => { return { nr: i, marka: x[0], model: x[1].replace(/ /gi, '%20') } })
    console.log(allModels)
    fs.writeFile(`./data/Models.json`, JSON.stringify(allModels, null, 2), (err) => {
      if (err) throw err
      console.log('The file has been saved!')
    })
    return allModels
  })
}

async function getALL() {
  await getBrands()
  await getModels()
}

getALL()