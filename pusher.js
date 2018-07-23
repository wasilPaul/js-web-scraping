const fs = require(`fs`)
const fetch = require('node-fetch')

const data = fs.readFileSync(`./data/Parameters.json`)
//../js-scraper_data/data/allData.json`
const jsonData = JSON.parse(data)

function dataPusher(data) {
    if (data && data.length) {
        console.log(JSON.stringify(data[0]))
        data.forEach(async (turbo) =>
            await fetch(`https://.......firebaseio.com/car_model/.json`,
                {
                    method: `POST`,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(turbo)
                })
                .then(res => res.json())
                .then(res => console.log(res))
        )

    }
}

dataPusher(jsonData)