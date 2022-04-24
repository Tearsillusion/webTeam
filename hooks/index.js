
var express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors');
let {spawn} = require('child_process')
var app = express()
app.all('*',function(req,res,next){
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers","X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By","3.2.1");
	res.header("Content-Type","application/json;charset=utf-8");
	if(req.method === 'POST' && req.url === '/hooks'){
		let event = req.headers['x-github-event'];
		
		console.log(event,req,res)
		// let child = spawn('sh',[`./${payload.repository.name}`]);
		
		
	}	
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
var server = app.listen(9003,function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('地址:',host)
	console.log('端口:',port)
	console.log("服务开启成功")
})




