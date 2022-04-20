const myCollection = async (req,res,sqlMain,moment,baseUrl,selectUser) => {
	res.status(200)
	
	
	const {id} = await selectUser(req,res,sqlMain)
	
	// 根据id查询
	const selectCollectionData = await sqlMain.selectJoinSql(
	'community.id,nickName,avatar,title,content,image_path,community.create_time,priview_address,code_address','(user,community)',"collection",
	"collection.user_id","user.id",
	"collection.community_id = community.id  AND user.id = " + id,"order by collection.id desc",""
	)
	console.log(selectCollectionData)
	if(!selectCollectionData){
		res.send({
			code: 400,
			data:null,
			message: "",
		})
		return
	}
	selectCollectionData.map((res)=>{
		res.create_time = moment(res.create_time).format("YYYY-MM-DD HH:mm:ss")
		res.avatar = res.avatar?baseUrl+'avatar/'+res.avatar:res.avatar
		res.image_path = res.image_path?baseUrl+'articles/'+res.image_path:res.image_path
	})
	res.send({
		code: 200,
		data:{
			acticleDetail:selectCollectionData
		},
		message: "",
	})
}
module.exports = myCollection
