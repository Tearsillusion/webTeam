
const mysql = require('mysql')

const useMysql = ()=>{
	let conn = mysql.createConnection({
		host:'localhost',
		prot:'3306',
		user:'root',
		password:'ljl1234',
		database:'webTeam',
		charset:'utf8',
	})
	conn.connect()
	return conn;
}

module.exports = useMysql

