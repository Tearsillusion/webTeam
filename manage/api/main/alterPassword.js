const alterPassword = async (req, res,sqlMain,selectUser) => {
	res.status(200)
	// oldPassword:旧密码
	// newPassword：密码
	
	const passwordReg = /^[a-zA-Z0-9]{6,22}$/
	const {oldPassword,newPassword} = req.body
	if (!oldPassword) {
		res.json({
			code: 400,
			message: "请输入旧密码",
		})
	} else if (!newPassword) {
		res.json({
			code: 400,
			message: "请输入新密码",
		})
	}else if (!newPassword.match(passwordReg)) {
		res.json({
			code: 400,
			message: "密码格式为6-22位字母+数字",
		})
	} else {
		
		
			const {id,password} = await selectUser(req,res,sqlMain)
				
			if(password === oldPassword){
				
				const updatePasswordResult = await sqlMain.updateSql('user','password = ?','Id',[newPassword,id])
				if(updatePasswordResult.changedRows){
					res.send({
						code: 200,
						message: "修改成功！",
					})
				}else{
					res.send({
						code: 400,
						message: "修改失败！",
					})
				}
				
			}else{
				res.send({
					code: 400,
					message: "旧密码错误！",
				})
			}
	}


}
module.exports = alterPassword
