const logout = async (req, res,authorization,sqlMain,selectUser) => {
	res.status(200)
	
	const {account} = await selectUser(req,res,sqlMain)
	
	let token = authorization.generateToken({
		account:account,
	},'1')
	res.send({
		code: 200,
		message: "退出成功！",
	})
	
}
module.exports = logout
