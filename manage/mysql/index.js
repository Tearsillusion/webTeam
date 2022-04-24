
const mysql = require('mysql')

const useMysql = ()=>{
	let conn = mysql.createConnection({
		host:'39.105.145.6',
		prot:'3306',
		user:'root',
		password:'ljl1234',
		database:'web',
		charset:'utf8',
	})
	conn.connect(function(err){
		console.log(err)
	})
	return conn;
}
module.exports = useMysql

