const forgetPassword = async (req, res, authorizationMain, sqlMain, redisClient) => {
	res.status(200)
	// email:邮箱--账号
	// code：验证码
	// password 密码

	const passwordReg = /^[a-zA-Z0-9]{6,22}$/
	const {
		email,
		code,
		password
	} = req.body
	if (!email) {
		res.json({
			code: 400,
			message: "请输入邮箱",
		})
	} else if (!code) {
		res.json({
			code: 400,
			message: "请输入验证码",
		})
	} else if (!password) {
		res.json({
			code: 400,
			message: "请输入密码",
		})
	} else if (!password.match(passwordReg)) {
		res.json({
			code: 400,
			message: "密码格式为6-22位字母+数字",
		})
	} else {

		const selectEmailResult = await sqlMain.selectAnySql('user', 'account', email)
		console.log(selectEmailResult)
		if (selectEmailResult) {
			redisClient.getValue(email, async (sendCode) => {
				if (code === sendCode) {
					const {
						id
					} = selectEmailResult[0]
					const updatePasswordResult = await sqlMain.updateSql('user', 'password = ?',
						'id', [password, id])
						
					if (updatePasswordResult) {
						res.json({
							code: 200,
							message: "密码修改成功",
						})
					}else{
						res.json({
							code: 400,
							message: "密码修改失败",
						})
					}
				} else {
					res.json({
						code: 400,
						message: "验证码错误",
					})
				}


			})
		} else {
			res.json({
				code: 400,
				message: "邮箱不存在",
			})
		}


	}
}
module.exports = forgetPassword
