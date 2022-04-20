const comments = async (req,res,sqlMain,moment,baseUrl,selectUser) => {
	res.status(200)
	
	// get 获取评论，post 发表评论， deleteComments 删除评论
	
	// get parmas： id 文章id
	// post parmas ：id 文章id content 评论内容
	// post parmas ：id 评论id
	
	const {id:user_id} = await selectUser(req,res,sqlMain)
	const {id} = req.params
	// 删除评论
	if(req.url.indexOf('delete') > -1){
		
		const selectComments = await sqlMain.deleteSql('comments','id',id + ' AND comments.user_id = '+user_id)
		if(!selectComments  || !selectComments.affectedRows){
			res.send({
				code: 400,
				message: "删除失败",
			})
			return;
		}
		res.send({
			code: 200,
			message: "删除成功",
		})
		
		return;
	}
	if(req.method === 'GET'){
		
		const selectComments = await sqlMain.selectJoinSql('comments.id,nickName,avatar,create_time,content','user','comments','comments.user_id','user.id','comments.community_id = '+id+'  order by comments.id desc')
		if(!selectComments){
			res.send({
				code: 400,
				message: "查询失败",
			})
			return;
		}
		selectComments.map((res)=>{
			res.avatar = res.avatar?baseUrl+'avatar/'+res.avatar:res.avatar
			res.create_time = moment(res.create_time).format("YYYY-MM-DD HH:mm:ss")
		})
		res.send({
			code: 200,
			data:{
				commentsData:selectComments
			},
			message: "成功",
		})
		
	}else{
		const {content} = req.body
		if(!content){
			res.send({
				code: 400,
				message: "请输入评论内容",
			})
			return;
		}
		const create_time = moment().format("YYYY-MM-DD HH:mm:ss")
		const insetComments = await sqlMain.insetSql('comments','community_id,user_id,create_time,content',[id,user_id,create_time,content])
		if(!insetComments || !insetComments.insertId){
			res.send({
				code: 400,
				message: "评论失败",
			})
			return;
		}
		res.send({
			code: 200,
			message: "评论成功",
		})
		
	}
	
	
	
}
module.exports = comments
