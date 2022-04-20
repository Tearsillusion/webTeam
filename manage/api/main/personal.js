const personal = async (req,res,sqlMain,baseUrl,selectUser) => {
	res.status(200)
	// get 获取个人信息 post 修改个人信息
	// post params
	// nickName 昵称
	
	const {id,avatar,nickName,account} = await selectUser(req,res,sqlMain)
	
	if(req.method === 'GET'){
		// 查询我的发布数量
		const selectReleaseCount = await sqlMain.selectJoinSql(
		'count(1)','user',"community",
		"community.user_id","user.id",
		"community.user_id = "+id," AND community.delete_status = 1"
		)
		const {'count(1)':releaseCount} = selectReleaseCount[0] 
		// 查询我的评论数量
		const selectCommentsCount = await sqlMain.selectJoinSql('count(1)','(community,user)','comments','comments.community_id','community.id','user.id = '+ id)
		const {'count(1)':commentsCount} = selectCommentsCount[0]  
		// 查询我的收藏数量
		const selectCollectionCount = await sqlMain.selectJoinSql(
		'count(1)','(user,community)',"collection",
		"collection.user_id","user.id",
		"collection.community_id = community.id  AND user.id = " + id,"",""
		)
		const {'count(1)':collectionCount} = selectCollectionCount[0]
		console.log(selectReleaseCount,selectCommentsCount,selectCollectionCount)
		res.send({
			code: 200,
			data:{
				avatar:avatar?baseUrl+'avatar/'+avatar:avatar,
				nickName:nickName,
				account:account,
				releaseCount:releaseCount,
				commentsCount:commentsCount,
				collectionCount:collectionCount
			},
			message: "成功",
		})
		
		
		
	}else{
		const {nick_name} = req.body
		if(!nick_name){
			res.send({
				code: 400,
				message: "请输入您的昵称",
			})
		}else{
			if(nick_name === nickName){
				res.send({
					code: 200,
					message: "修改成功",
				})
				return
			}
			const selectIsExistNickName = await sqlMain.selectExistSql('user','nickName',nick_name)
			if(!selectIsExistNickName){
				res.send({
					code: 400,
					message: "修改失败",
				})
				return
			}
			const {'count(*)':count} = selectIsExistNickName[0]
			if(count > 0){
				res.send({
					code: 400,
					message: "昵称已存在",
				})
				return
			}
			const updateNickName = await sqlMain.updateSql('user','nickName = ?','Id',[nick_name,id])
			
			if(!updateNickName || !updateNickName.changedRows){
				res.send({
					code: 400,
					message: "修改失败",
				})
				return
			}
			res.send({
				code: 200,
				message: "修改成功",
			})
			
		}
		
	}

}
module.exports = personal
