
const mysql = require('mysql')

const useMysql = ()=>{
	let conn = mysql.createConnection({
		host:'192.168.2.28',
		prot:'3306',
		user:'root',
		password:'ljl1234',
		database:'webManage',
		charset:'utf8',
	})
	conn.connect()
	return conn;
}

module.exports = useMysql

