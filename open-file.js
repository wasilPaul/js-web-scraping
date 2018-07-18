let fs = require(`fs`)
const fetch = require('node-fetch')
const cheerio = require('cheerio')

const url = [`http://kodeturbo.com/index.php`, `?marka=`, `?do=cars2&marka=`, `&do=cars`, `&model=`, `?do=turbo&oem=`]

const data = fs.readFileSync(`./data/Models.json`)

const jsonData = JSON.parse(data)

const show = (arr) => arr.map(arr => console.log(arr))

let modelsParameters = []
//show(jsonData)

function getModelsParameters(data) {
    inAllParameters = []
    if (data && data.length) {
        data/*.filter(x => x.marka == `Alfa-Romeo`||'Audi'||`Alpina`)*/.forEach(async function (marka) {
            const parameter = await fetch(`${url[0]}${url[2]}${marka.marka}${url[4]}${marka.model}`).then(resp => resp.text()).catch(error => console.log(`ERROR: `, error))
            const $ = cheerio.load(parameter)

            $(`tr`).each(function (i, parameter) {
                const $parameter = $(parameter)
                if (i != 0) {
                    inAllParameters.push($parameter.text().split('\n'))
                }
                console.log(inAllParameters)

            })
            modelsParameters = inAllParameters.map(x => {

                return {
                    mark: x[1].trim(),
                    model: x[2].trim(),
                    power: x[3].trim(),
                    capacity: x[4].trim(),
                    no: x[5].trim(),
                    date: x[6].trim(),
                    turbo_OEM: x.slice(7, x.length).map(x => x.trim()).filter(x => x != '')
                }
            })
            fs.writeFile(`./data/Parameters.json`, JSON.stringify(modelsParameters, null, 2))
            return modelsParameters
        })
    }
}

getModelsParameters(jsonData)

