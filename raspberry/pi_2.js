//2は1へ
var target = 'http://192.168.12.1:5000';

// 8番のGPIOピンを出力として登録
var fs = require('fs'); 
fs.writeFileSync('/sys/class/gpio/unexport', '8');
fs.writeFileSync('/sys/class/gpio/export', '8');
fs.writeFileSync('/sys/class/gpio/gpio8/direction', 'out');

function blink(){
	console.log("blink!");
	fs.writeFileSync('/sys/class/gpio/gpio8/value', '0');
	fs.writeFileSync('/sys/class/gpio/gpio8/value', '1');
	setTimeout(function(){
		fs.writeFileSync('/sys/class/gpio/gpio8/value', '0');
	},3000);
}


var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http');
var port = 5000;
var server = http.createServer(app);
var request = require('request');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function relaySend(message){
	console.log("relaySend!");
	request.post({url:target, form: {message:message}}, function(err,httpResponse,body){ 
	console.log(err);
	 });
}
app.post('/', function(req, res) {
	console.log("post");
	console.dir(req.body.message);
	if(req.body.message){
		blink();
		relaySend(req.body.message);	
	}
});

server.listen(port,function(){
    console.log("server listening on port : ", port)
});