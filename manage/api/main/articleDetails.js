const articleDetails = async (req,res,sqlMain,moment,baseUrl,selectUser) => {
	res.status(200)
	// id:文章id
	const {id} = req.params
	const {id:user_id} = await selectUser(req,res,sqlMain)
	const selectCollectionData = await sqlMain.selectJoinSql(
	'community.id','(user,community)',"collection",
	"collection.user_id","user.id",
	"collection.community_id = community.id  AND user.id = " + user_id,"",""
	)
	if(!selectCollectionData){
		res.send({
			code: 400,
			data:null,
			message: "",
		})
		return
	}
	console.log(selectCollectionData)
	// 根据id查询
	const selectCommunityData = await sqlMain.selectJoinSql(
	'community.id,delete_status,nickName,avatar,title,content,image_path,create_time,priview_address,code_address,star_status','user',"community",
	"community.user_id","user.id",
	"community.id = "+id,"",""
	)
	
	if(!selectCommunityData){
		res.send({
			code: 400,
			data:null,
			message: "",
		})
		return
	}
	
	if(selectCommunityData[0].delete_status === '0'){
		res.send({
			code: 400,
			data:null,
			message: "该文章已被作者删除",
		})
		return
	}
	delete selectCommunityData[0]['delete_status'];
	selectCommunityData.map((res)=>{
		res.create_time = moment(res.create_time).format("YYYY-MM-DD HH:mm:ss")
		res.avatar = baseUrl+'avatar/'+res.avatar
		res.image_path = baseUrl+'articles/'+res.image_path
		selectCollectionData.map((list)=>{
			if(res.id === list.id){
				res.star_status = 1
			}else{
				res.star_status = 0
			}
		})
	})
	res.send({
		code: 200,
		data:{
			acticleDetail:selectCommunityData
		},
		message: "",
	})
}
module.exports = articleDetails
