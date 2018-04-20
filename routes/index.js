var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var request = require("request");
    request('http://localhost:3000/mesures', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('testounet');
            var mesures = JSON.parse(body);
            res.render('index', { title: 'IOT - Sonde thermique', mesures: mesures });
        }
    });
    /*request({url: 'http://localhost:3000/mesures', json: true}, function(err, res, json) {
        if (err) {
            throw err;
        }
        console.log(json);
    });*/

});

module.exports = router;
