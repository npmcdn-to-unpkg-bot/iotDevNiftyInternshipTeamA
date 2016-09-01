var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http');
var port = 5000;
var server = http.createServer(app);
var request = require('request');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function relaySend(){
	request.get(
	    target,
	    function (error, response, body) {
	        if (!error && response.statusCode == 200) {
	            console.log(body)
	        }
	    }
	);
}

app.post('/', function(req, res) {
	console.log("post");
	console.dir(req.body.message);
});

server.listen(port,function(){
    console.log("server listening on port : ", port)
});