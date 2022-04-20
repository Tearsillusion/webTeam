
const useApp = require('./api/index.js')
const app = useApp()
var server = app.listen(3000,function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('地址:',host)
	console.log('端口:',port)
	console.log("服务开启成功")
})

