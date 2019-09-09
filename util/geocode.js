const request = require('request');
const geoCode = (address, callback) => {
    let geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?limit=2&access_token=pk.eyJ1Ijoicml6d2FhbiIsImEiOiJjazA5eW8zaDEwZHplM25xdDNvNGw3dDdnIn0.rSon77Rd4xf7cElu3GwluA";
    request({
        url: geocodeURL,
        json: true
    }, (error, reponse, body) => {
        if (error) {
            callback('Unable to call service!', null);
        } else if (body.features[0].length == 0) {
            callback('Unable to find address location', null);
        } else {
            let data = {
                lat: body.features[0].center[1],
                lon: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(null, data)
        }
    })
}
module.exports = geoCode;