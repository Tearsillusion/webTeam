const login = async (req, res,authorization,sqlMain) => {
	res.status(200)
	// email:邮箱--账号
	// password：密码
	const emailReg = /^\w+@\w+\.\w+$/i;
	const passwordReg = /^[a-zA-Z0-9]{6,22}$/
	const {email,password} = req.body
	if (!email) {
		res.json({
			code: 400,
			message: "请输入账号",
		})
	} else if (!password) {
		res.json({
			code: 400,
			message: "请输入密码",
		})
	} else {
		
		const selectEmail = await sqlMain.selectAnySql('user','account',email)
		
		if(selectEmail&&selectEmail.length === 0){
			res.send({
				code: 400,
				message: "账号不存在！",
			})
			return;
		}else{
			if (selectEmail[0]['password'] === password) {
				let {nickName,account,avatar} = selectEmail[0]
				let token = authorization.generateToken({
					account:account,
				})
				res.send({
					code: 200,
					data:{
						nickName:nickName,
						account:account,
						avatar:avatar,
						token:token
					},
					message: "登录成功！",
				})
				return;
			}else{
				res.send({
					code: 400,
					message: "密码错误！",
				})
				return;
			}
		}
		
		
	}


}
module.exports = login
