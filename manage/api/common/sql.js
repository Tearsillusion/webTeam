const useMysql = require('../../mysql/index.js')
const authorizationMain = require("../../jwt/index.js");
const sqlMain = {
	// 通过authorization查询用户信息
	selectAuthSql:async (authorization)=>{
		let result
		try{
			result = authorizationMain.validationToken(authorization)
		}catch(e){
			
		}
		if(result){
			const {account} = result
			const conn = useMysql()
			const selectEmailsql = `SELECT * FROM user where account = "${account}"`;
			const selectEmailResult = function() {
				return new Promise((resolve, reject) => {
					conn.query(selectEmailsql, function(err, result) {
						resolve(result)
					})
				})
			}
			const selectEmail = await selectEmailResult()
			conn.end()
			return selectEmail;
		}
		
	},
	// 通过表名查询某个字段列表信息
	selectAnySql: async (tableName,fieldName,selectName)=>{
		const conn = useMysql()
		const selectEmailsql = `SELECT * FROM ${tableName} where ${fieldName} = "${selectName}"`;
		const selectEmailResult = function() {
			return new Promise((resolve, reject) => {
				conn.query(selectEmailsql, function(err, result) {
					resolve(result)
				})
			})
		}
		const selectEmail = await selectEmailResult()
		conn.end()
		return selectEmail;
	},
	// 通过表名查询某个字段是否存在
	// tableName：表名字,fieldName：字段名，value：值
	//例：SELECT count(*) FROM user where account = "111"
	selectExistSql:async (tableName,fieldName,value)=>{
		const conn = useMysql()
		const selectEmailsql = `SELECT count(*) FROM ${tableName} where ${fieldName} = "${value}"`;
		const selectEmailResult = function() {
			return new Promise((resolve, reject) => {
				conn.query(selectEmailsql, function(err, result) {
					resolve(result)
				})
			})
		}
		const selectEmail = await selectEmailResult()
		conn.end()
		return selectEmail;
	},
	// 插入任意数据
	// tableName：表名字,fieldName：需要插入的字段,actualData:实际值
	// INSERT INTO user (password,account) VALUES (?,?)
	insetSql:async (tableName,fieldName,actualData)=>{
		const conn = useMysql()
		console.log(tableName,fieldName,actualData)
		const insertSql = `INSERT INTO ${tableName}(${fieldName}) VALUES(${fieldName.replace(/(\w+)/g,'?')})`;
		const insertData = actualData;
		console.log(insertSql,insertData)
		const insetSqlResult = function() {
			return new Promise((resolve, reject) => {
				conn.query(insertSql, insertData, function(err, result) {
					console.log(err)
					resolve(result)
				});
			})
		}
		
		const insetResult = await insetSqlResult()
		conn.end()
		return insetResult;
	},
	// 更新任意数据
	// tableName：表名字,fieldName：需要修改的字段 name = ?,actualData:实际值,isAccording:根据那个字段修改比如 Id
	// 例如：UPDATE user SET password = ?,account = ? WHERE Id = ?
	// actualData:[password,account,Id]
	updateSql: async (tableName,fieldName,isAccording,actualData)=>{
		const conn = useMysql()
		const insertSql = `UPDATE ${tableName} SET ${fieldName} WHERE ${isAccording} = ?`;
		const insertData = actualData;
		const updateSqlResult = function() {
			return new Promise((resolve, reject) => {
				conn.query(insertSql, insertData, function(err, result) {
					resolve(result)
				});
			})
		}
		
		const updateResult = await updateSqlResult()
		conn.end()
		return updateResult;
	},
	// 删除数据
	// tableName：表名字,isAccording:根据那个字段删除，比如id，value：删除的值：比如35
	// 例如：DELETE FROM user where id = 35
	deleteSql: async (tableName,isAccording,value)=>{
		const conn = useMysql()
		const deleteSql = `DELETE FROM ${tableName} where ${isAccording} = ${value}`;
		console.log(deleteSql)
		const deleteSqlResult = function() {
			return new Promise((resolve, reject) => {
				conn.query(deleteSql,function(err, result) {
					resolve(result)
				});
			})
		}
		
		const deleteResult = await deleteSqlResult()
		conn.end()
		return deleteResult;
	},
	// 根据外键查询
	//selectFieldName 查询字段名字 *  targetTable 目标表 user，currentTable 当前表 community, currentFieldName 当前外键字段 community.user_id, targetFieldName 目标主键字段 user.id,
	//isSelectAll为all全局匹配，
	//例:SELECT * FROM user  JOIN community ON community.user_id = user.id WHERE community.user_id = 36
	selectJoinSql: async (selectFieldName,targetTable,currentTable,currentFieldName,targetFieldName,selectAccording,free="",limit="")=>{
		const conn = useMysql()
		const isSelectAll = selectAccording === 'all'?'':`WHERE ${selectAccording}`
		const selectJoinSql = `SELECT ${selectFieldName} FROM ${targetTable}  JOIN ${currentTable} ON ${currentFieldName} = ${targetFieldName} ${isSelectAll} ${free} ${limit}`;
		console.log(selectJoinSql)
		const selectJoinSqlResult = function() {
			return new Promise((resolve, reject) => {
				conn.query(selectJoinSql,function(err, result) {
					resolve(result)
				});
			})
		}
		
		const selectJoinResult = await selectJoinSqlResult()
		conn.end()
		return selectJoinResult;
	},
	// 查询表中有多少条数据 COUNT(1) 或者详细数据 *
	selectTable:async (selectType,tableName,limit,free)=>{
		const conn = useMysql()
		const selectTable = `SELECT ${selectType} FROM ${tableName} ${limit} ${free}`;
		console.log(selectTable)
		const selectTableSqlResult = function() {
			return new Promise((resolve, reject) => {
				conn.query(selectTable,function(err, result) {
					resolve(result)
				});
			})
		}
		
		const selectTableResult = await selectTableSqlResult()
		conn.end()
		return selectTableResult;
	},
}
// SELECT * FROM user  JOIN community ON community.user_id = user.id WHERE community.user_id = 36
module.exports = sqlMain