const fs = require(`fs`)
const fetch = require('node-fetch')

const data = fs.readFileSync(`../js-scraper_data/data/allDataHanged.json`)
//../js-scraper_data/data/allData.json`
const jsonData = JSON.parse(data)

function dataPusher(data) {
    if (data && data.length) {
        console.log(JSON.stringify(data[0]))
        data.forEach(async (turbo) =>
            await fetch(`https://turbo-direct-project.firebaseio.com/turbo.json`,
                {
                    method: `POST`,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(turbo)
                })
                .then(handleErrors)
                .then(res => res.json())
                .then(res => console.log(res))
                .catch(error => console.error(error))
        )
    }
}

function handleErrors(response) {
    if (!response.ok) throw Error(response.statusText)
    return response
}

dataPusher(jsonData)