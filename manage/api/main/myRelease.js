const myRelease = async (req,res,sqlMain,moment,baseUrl,selectUser) => {
	res.status(200)
	// deleteMyRelease 删除我的发布 id:文章id
	
	const {id} = await selectUser(req,res,sqlMain)
	
	if(req.url.indexOf('delete') > -1){
		const {id:community_id} = req.params
		const deleteMyCommunity = await sqlMain.updateSql('community','delete_status = ?','Id', [0,community_id])
		if(!deleteMyCommunity || !deleteMyCommunity.changedRows){
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
	// 根据id查询
	const selectCommunityData = await sqlMain.selectJoinSql(
	'community.id,nickName,avatar,title,content,image_path,create_time,priview_address,code_address,star_status','user',"community",
	"community.user_id","user.id",
	"community.user_id = "+id," AND community.delete_status = 1  order by community.id desc"
	)
	if(!selectCommunityData){
		res.send({
			code: 400,
			data:null,
			message: "",
		})
		return
	}
	selectCommunityData.map((res)=>{
		res.create_time = moment(res.create_time).format("YYYY-MM-DD HH:mm:ss")
		res.avatar = res.avatar?baseUrl+'avatar/'+res.avatar:res.avatar
		res.image_path = res.image_path?baseUrl+'articles/'+res.image_path:res.image_path
	})
	res.send({
		code: 200,
		data:{
			acticleDetail:selectCommunityData
		},
		message: "",
	})
}
module.exports = myRelease
