const fs = require(`fs`)

const turbo = fs.readFileSync(`./data/TurboNrOEM.json`)
const data = fs.readFileSync(`../js-scraper_data/data/allData.json`)


const jsonTurbo = JSON.parse(turbo)
const jsonData = JSON.parse(data).map(x => x.turboOEM)

console.log(jsonData[1], jsonTurbo[1])
if (jsonData && jsonData.length && jsonTurbo && jsonTurbo.length) {
    const notFind = jsonTurbo.filter(f => !jsonData.includes(f))
    fs.writeFile(`./data/notFind.json`, JSON.stringify(notFind, null, 2), (err) => {
        if (err) throw err
        console.log('The file has been saved!')
    })
}



