const selectUser = async (req,res,sqlMain)=>{
	
	const { authorization } = req.headers
	const selectEmail = await sqlMain.selectAuthSql(authorization)
	console.log(selectEmail)
	if(!selectEmail || selectEmail.length === 0){
		res.send({
			code: 400,
			message: "操作失败",
		})
		return;
	};
	
	return selectEmail[0]
	
}
module.exports = selectUser