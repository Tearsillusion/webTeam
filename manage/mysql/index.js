
const mysql = require('mysql')

const useMysql = ()=>{
	let conn = mysql.createConnection({
		host:'39.105.145.6',
		prot:'3006',
		user:'root',
		password:'root',
		database:'web',
		charset:'utf8',
	})
	conn.connect(function(err){
		console.log(err)
	})
	return conn;
}

module.exports = useMysql

