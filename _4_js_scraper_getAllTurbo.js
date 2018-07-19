const fs = require(`fs`)
const fetch = require('node-fetch')
const cheerio = require('cheerio')

const url = [`http://kodeturbo.com/index.php`, `?marka=`, `?do=cars2&marka=`, `&do=cars`, `&model=`, `?do=turbo&oem=`, `?szukaj=`, '&go=SEARCH+%C2%BB&do=search']

const data = fs.readFileSync(`./data/TurboNrOEM.json`)

const jsonData = JSON.parse(data)

let turboOem = []

function getTurbParameters(data) {

  let allTurboOEMPArameters = []

  if (data && data.length) {

    data.forEach(async function (marka) {
      try {
        const turbo = await fetch(`${url[0]}${url[6]}${marka}${url[7]}`).then(resp => resp.text())
        const $ = cheerio.load(turbo)

        $(`tr`).each(function (i, turbo) {
          const $turbo = $(turbo)
          if (i != 0) {
            allTurboOEMPArameters.push($turbo.text().split('\n'))
          }
          console.log(allTurboOEMPArameters)
        })

        turboOem = allTurboOEMPArameters.map(x => {
          return {
            turboOEM: x[1].trim(),
            compressor_wheel: x[2].trim(),
            turbine_wheel: x[3].trim(),
            bearing_housing: x[4].trim(),
            back_plate: x[5].trim(),
            heat_shield: x[6].trim(),
            actuator: x[7].trim(),
            nozzles: x[8].trim(),
            gasket_kit: x[9].trim(),
            repair_kit: x[10].trim(),
            KODE_CHRA: x[11].trim()
          }
        })
        fs.writeFile(`./data/TurboOEMParameters.json`, JSON.stringify(turboOem, null, 2))
        return turboOem
      } catch (error) {
        console.log(`message Error: ${error}`);
      }
    })
  }
}

getTurbParameters(jsonData)