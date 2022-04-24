let http = require('http')
let {spawn} = require('child_process')

let server = http.createServer(function(req,res){
	console.log(111112222,req);
	if(req.method === 'POST' && req.url === '/hooks'){
		let buffers = []
		req.on('data',function(buffer){
			buffers.push(buffer)
		})
		req.on('end',function(buffer){
			let body = Buffer.concat(buffers)
			let event = req.headers['x-github-event'];
			res.setHeader('Content-Type','application/json');
			res.end(JSON.stringify({code:200}))
			if(event === 'push'){
				let payload = JSON.parse(body)
				console.log(payload)
				let child = spawn('sh',[`./${payload.repository.name}`]);
				child.stdout.on('data',function(){
					
				})
			}
			
		})
	}
})

server.listen(9003,function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('地址:',host)
	console.log('端口:',port)
	console.log("服务开启成功")
})

