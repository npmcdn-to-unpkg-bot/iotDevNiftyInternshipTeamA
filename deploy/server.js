#!/usr/bin/env node
var express = require('express');
var bodyParser = require('body-parser');//htmlでpostの処理に必要
var app = express();
var path = require('path');
var http = require('http');
var port = 3000;
var server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/app', require('./controller/app.controller.js'));
app.use('/api/path', require('./controller/path.controller.js'));
app.get('/', function(req, res) {// make '/app' default route
  return res.redirect('/app');
});

// Handle 404 error. 
app.use("*",function(req,res){
  res.status(404);
  res.send('404<br>There is no such file!!!!!');
  res.end();
});

server.listen(port,function(){
    console.log("server listening on port : ", port)
});