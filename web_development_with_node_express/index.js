"use strict";

var express = require('express');
var app = express();
var handlebars = require('express-handlebars')
    .create({ defaultLayout: 'main',
              helpers: {
                  section: function(name, options) {
                      if(!this._sections) this._sections = {};
                      this._sections[name] = options.fn(this);
                      return null;
                  }
              }  
            });
var fortune = require('./lib/fortune.js');

app
    .engine('handlebars', handlebars.engine)
    .set('view engine', 'handlebars')
    .use(express.static(__dirname + "/public"))
    .set('port', process.env.PORT || 3000);

app.use(function(req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' &&
        req.query.test === '1';
    next();
});

app.use(function(req, res, next) {
    if(!res.locals.partials) res.locals.partials = {};
    res.locals.partials.weatherContext = getWeatherData();
    next();
});

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/about', function(req, res) {
    res.render('about', {
        fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js' 
    });
});

app.get('/template_test', function(req, res) {
    res.render('template_test', {
        currency: {
            name: 'Unitd States dollars', abbrev: 'USD',
        },
        tours: [
            { name: 'Hood River', price: '$99.95' },
            { name: 'Oregon Coast', price: '$159.95' },
        ],
        specialsUrl: '/january-specials',
        currencies: ['USD', 'GBP', 'BTC' ],
    });
});

app.get('/tours/hood-river', function(req, res) {
    res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function(req, res) {
    res.render('tours/request-group-rate');
});

var tours = [
    { id: 0, name: 'Hood River', price: 99.99},
    { id: 1, name: 'Orgon Coast', price: 149.95}
];
//간단한 json 던짐
app.get('/api/tours', function(req, res) {
    res.json(tours);
});

app.get('/api/tours', function(req, res) {
    var toursXml = '' + 
        products.map(function(p){
            return " id = " + p.id + ">" + p.name + "";
        }).join('') + '';
});

app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + 
        app.get('port') + '; press Ctrl-C to terminate.');
});


function getWeatherData() {
    return {
        locations: [
            {
                name: 'Portland',
                forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
                weather: 'Overcast',
                temp: '54.1 F (12.3 C)',
            },
            {
                name: 'Portland',
                forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
                weather: 'Overcast',
                temp: '54.1 F (12.3 C)',
            },
            {
                name: 'Portland',
                forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
                weather: 'Overcast',
                temp: '54.1 F (12.3 C)',
            },
            {
                name: 'Portland',
                forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
                weather: 'Overcast',
                temp: '54.1 F (12.3 C)',
            },
        ],
    };
}