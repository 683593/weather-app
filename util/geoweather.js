const request = require('request');
const geoweather = (lat, lon, cb) => {
    const url = `https://api.darksky.net/forecast/d88e9d69f5e26d1c9631a473eaf2ce8d/${lat},${lon}?units=si`;
    request({
        url: url,
        json: true
    }, (error, response, body) => {
        if (error) {
            cb('Unable to use service', null)
        } else if (body.error) {
            cb(`Unable to find weather details for provided location , Error: ${body.error}`, null)
        } else {
            let data = {
                latitude: lat,
                longitude: lon,
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature,
                humidity: body.currently.humidity*100,
                visibility: body.currently.visibility,
                precipType: body.daily.data[0].precipType,
                summary: body.daily.data[0].summary
            }
            cb(null, data);
        }
    })
}
module.exports = geoweather;