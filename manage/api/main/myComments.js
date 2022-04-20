const myComments = async (req,res,sqlMain,moment,baseUrl,selectUser) => {
	res.status(200)
	
	
	const {id} = await selectUser(req,res,sqlMain)
	
	const selectMyComments = await sqlMain.selectJoinSql('comments.id,comments.community_id,nickName,avatar,comments.create_time,comments.content,community.title','(community,user)','comments','comments.community_id','community.id','user.id = '+ id+' order by comments.id desc')
	if(!selectMyComments){
		res.send({
			code: 400,
			message: "查询失败",
		})
		return;
	}
	selectMyComments.map((res)=>{
		res.avatar = res.avatar?baseUrl+'avatar/'+res.avatar:res.avatar
		res.create_time = moment(res.create_time).format("YYYY-MM-DD HH:mm:ss")
	})
	res.send({
		code: 200,
		data:{
			myCommentsData:selectMyComments
		},
		message: "成功",
	})
}
module.exports = myComments
