var express = require('express');
var _request = require('request');
var app = express();
var bodyParser = require('body-parser');

var key = require("./config.json"); 
//var IFTTT_EVENT_NAME = "IoT_Intern";  // イベント名

//key.eventName = "IoT_Intern_Kobayashi";

app.set('port', (process.env.PORT || 5000));
 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// 8番のGPIOピンを出力として登録
var fs = require('fs')
fs.writeFileSync('/sys/class/gpio/unexport', '8');
fs.writeFileSync('/sys/class/gpio/export', '8');
fs.writeFileSync('/sys/class/gpio/gpio8/direction', 'out');

 
function blink(){
    console.log("blink!");
    fs.writeFileSync('/sys/class/gpio/gpio8/value', '0');
    fs.writeFileSync('/sys/class/gpio/gpio8/value', '1');
    setTimeout(function(){
    fs.writeFileSync('/sys/class/gpio/gpio8/value', '0');
    },5000);
}

 
// IFTTTへ送信
app.post('/', function(request, response) {
    blink();
    console.log(request.body);
    if(request.body.Kim == "true"){
	console.log("send to Kim");
	sendMessage(request.body.message,"Kim");
    }
    if(request.body.Ohashi == "true"){
	console.log("send to Ohashi");
        sendMessage(request.body.message,"Ohashi");
    }
    if(request.body.Kobayashi == "true"){
	console.log("send to Kobayashi");
        sendMessage(request.body.message,"Kobayashi");
    }
});

function sendMessage(message,target){
	targetURI = 'http://maker.ifttt.com/trigger/IoT_Intern_' + target + '/with/key/' + key.iftttKey;
	console.log(targetURI)
	console.log(target);
	console.log(message);
	var options = {
                uri: targetURI,
                form: {
                        value1:message
                },
                json: true
        };

        console.log('---------- [output]');
        console.log(options.uri);

        _request.post(options, function(error, response, body){
                if (!error && response.statusCode == 200) {
                        console.log(body);
                } else {
                        console.log('error: '+ response.statusCode);
                }
        });
};
 
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
