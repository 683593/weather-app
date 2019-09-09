const express = require('express')
const path = require('path');
const geoCODE = require('../util/geocode');
const geoWeather = require('../util/geoweather');
const hbs = require('hbs');

function getWeather(address = 'Airoli', callback) {
    geoCODE(address, (error, result) => {
        if (error) return callback(error);
        else {
            // console.log(result)
            geoWeather(result.lat, result.lon, (err, response) => {
                if (err) return err;
                else {
                    response.address = address;
                    response.location = result.location;
                    callback(response);
                }
            })
        }
    })
}
// getWeather((info) => {
//     console.dir(info)
// })
const app = express()
const port = process.env.PORT || 3000;
console.log(__dirname)
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const commanViews = path.join(__dirname, '../templates/comman');

app.use(express.static(publicDirectory))
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(commanViews);
app.get('', (req, res) => {
    res.render('index', {
        title: "Weather | Home",
        name: 'Rizwaan'
    })
    // res.send("Hello Express");
    //next();
})
app.get('/weather', (req, res, next) => {

    getWeather('Airoli', (info) => {
        res.render('weather', {
            title: "Weather | Home",
            name: 'Weather Report',
            reports: info
        });
    })
});
//search form API
app.get('/api/forcast/:address', (req, res, next) => {
    //console.dir(req);
    //res.send(req.params);
    let address = req.params.address ? req.params.address : undefined;
    if (!address) return;
    getWeather(address, (info) => {
        res.send({
            search: address,
            reports: info
        });
    });
    // getWeather((info) => {
    //     res.render('weather', {
    //         title: "Weather | Home",
    //         name: 'Weather Report',
    //         reports: info
    //     });
    // })
});
app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        description: '404 Page not found!!',
    });
});
app.listen(port, () => {
    console.log("Server is started on PORT: " + port)
})