let fs = require(`fs`)
const fetch = require('node-fetch')
const cheerio = require('cheerio')

const url = [`http://kodeturbo.com/index.php`, `?marka=`, `?do=cars2&marka=`, `&do=cars`, `&model=`, `?do=turbo&oem=`]

const data = fs.readFileSync(`./Models.json`)

const jsonData = JSON.parse(data)

const show = (arr) => arr.map(arr => console.log(arr))

//show(jsonData)

function getModelsParameters(data) {
    inAllParameters = []
    if (data && data.length) {
        data/*.filter(x => x.marka == 'DDC')*/.forEach(async function (marka) {
            const parameter = await fetch(`${url[0]}${url[2]}${marka.marka}${url[4]}${marka.model}`).then(resp => resp.text()).catch(error => console.log(error))
            const $ = cheerio.load(parameter)

            $(`tr`).each(function (i, parameter) {
                const $parameter = $(parameter)
                if (i != 0) {
                    inAllParameters.push($parameter.text().split('\n'))
                }
                console.log(inAllParameters)

            })
            fs.writeFile(`./Parameters.json`, JSON.stringify(inAllParameters, null, 2))
            return inAllParameters
        })
    }
}

//getModelsParameters(jsonData)
const params = fs.readFileSync(`./Parameters.json`)

const jsonParams = JSON.parse(params)

const showLen = jsonParams.length

console.log(showLen)
