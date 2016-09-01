var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http');
var port = 5000;
var server = http.createServer(app);
var request = require('request');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', function(req, res) {
	console.log("postでメッセージがサーバーに届きました！以下がそのメッセージです。");
	console.dir(req.body.message);
});

server.listen(port,function(){
    console.log("server listening on port : ", port)
});