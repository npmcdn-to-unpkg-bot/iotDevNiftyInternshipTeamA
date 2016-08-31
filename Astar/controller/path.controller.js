var express = require('express');
var router = express.Router();
var path = require('path');

var pathService = require('../service/path.service.js');

router.post('/findpath', function (req, res) {
	console.log(req.body);
    pathService.findPath(req.body.map,req.body.RA,req.body.TA)
        .then(function (data) {
            res.status(200).send(data);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
});

module.exports = router;