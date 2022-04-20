
const jwt = require("jsonwebtoken");

const authorization = {
	// 生成token
	generateToken:(key,time="1d")=>{
		let token = jwt.sign(key, 'secret',{
		  expiresIn:time // 一天
		});
		return token
	},
	// 验证token
	validationToken:(token)=>{
		let result = jwt.verify(token, 'secret');
		return result
	}
}

module.exports = authorization