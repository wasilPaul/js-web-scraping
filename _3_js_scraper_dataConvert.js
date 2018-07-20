const fs = require('fs')

const data = fs.readFileSync(`./data/Parameters.json`)

const jsonData = JSON.parse(data)

const turboNumbers = []

const getAllTurboNumber = allParameters =>
  allParameters
    .reduce((allNr, modelNr) =>
      allNr.concat(...modelNr.turbo_OEM), [])
    .filter((nr, idx, allArray) => allArray.indexOf(nr) == idx)
    .sort()
    .map(x => x.replace(/ /gi, `-`))
    .map(auto => turboNumbers.push(auto));

getAllTurboNumber(jsonData)

console.log(turboNumbers)

fs.writeFile(`./data/TurboNrOEM.json`, JSON.stringify(turboNumbers, null, 2), (err) => {
  if (err) throw err
  console.log('The file has been saved!')
})