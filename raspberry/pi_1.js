var express = require('express');
var request = require('request');
var app = express();
var bodyParser = require('body-parser');

var key = require("./config.json"); 

key.eventName = "IoT_Intern";

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
    },3000);
}

 
// IFTTTへ送信
app.post('/', function(request, response) {
    blink();
    console.log(request.body.message);
    var _request = require('request'); 
    var options = {
        uri: 'http://maker.ifttt.com/trigger/' + key.eventName + '/with/key/' + key.iftttKey,
        form: {
            value1:request.body.message
        },
        json: true
    };
 
    console.log('---------- [output]');
    console.log(options);
 
    _request.post(options, function(error, response, body){
        if (!error && response.statusCode == 200) {
            console.log(body);
        } else {
            console.log('error: '+ response.statusCode);
        }
    });
});
 
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
