const articleList = async (req,res,sqlMain,moment,baseUrl) => {
	res.status(200)
	// key_word:搜索内容
	// page：页数
	
	const {key_word} = req.body
	const {page} = req.params
	const limit_count = 20
	if(!page){
		page = 1
	}
	// 查询总条数
	const selectCommunityCount = await sqlMain.selectTable('COUNT(1)','community','',(key_word?`WHERE title LIKE "${key_word.toString()}%" AND community.delete_status = 1`:'WHERE community.delete_status = 1'))
	console.log(selectCommunityCount)
	if(!selectCommunityCount){
		res.send({
			code: 400,
			data:null,
			message: "",
		})
		return
	}
	const {'COUNT(1)':total_count} = selectCommunityCount[0]
	
	if(total_count&&total_count > 0){
		const current_page = page //当前页数
		const total_page = Math.ceil(total_count/limit_count) //总页数
		// 查询数据
		const limtTeam = ((page-1)*limit_count)+','+((page-1)*limit_count+limit_count)
		const selectCommunityData = await sqlMain.selectJoinSql(
		'community.id,nickName,avatar,title,content,image_path,create_time,priview_address,code_address,star_status','user',"community",
		"community.user_id","user.id",
		"all",(key_word?`WHERE title LIKE "${key_word.toString()}%" AND community.delete_status = 1`:'WHERE community.delete_status = 1'),'order by community.id desc limit '+limtTeam
		)
		console.log(selectCommunityData)
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
				current_page:current_page,
				total_count:total_count,
				total_page:total_page,
				acticleData:selectCommunityData
			},
			message: "",
		})
	}else{
		res.send({
			code: 200,
			data:{
				acticleData:[]
			},
			message: "",
		})
	}
	
	
	

}
module.exports = articleList
