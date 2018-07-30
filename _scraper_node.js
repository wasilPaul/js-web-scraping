const cheerio = require(`cheerio`)
const request = require(`request`)

const url = `http://..../index.php`

request(url, function (error, resp, body) {
    if (error) {
        return console.error('upload failed:', error);
    }
    const allBrands = []
    const $ = cheerio.load(body)
    let brand = $(`option`).each(function (i, brand) {
        const $brand = $(brand)
        allBrands.push($brand.text())
        return allBrands
    })
    console.log(allBrands)
    console.log('statusCode:', resp && resp.statusCode)
})

