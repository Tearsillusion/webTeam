const articleRelease = async (req, res,sqlMain,moment,selectUser) => {
	res.status(200)
	// image_name:图片名称
	// title：标题
	// priview_address：预览地址
	// code_address：源码地址
	// content:描述
	
	const {image_name,title,priview_address,code_address,content} = req.body
	if (!title) {
		res.json({
			code: 400,
			message: "请输入标题",
		})
	} else {
			const {id,nickName,avatar} = await selectUser(req,res,sqlMain)
			
			const create_time = moment().format("YYYY-MM-DD HH:mm:ss")
			const insetArticleData = await sqlMain.insetSql('community',
			'title,image_path,create_time,priview_address,code_address,content,user_id',
			[title,image_name,create_time,priview_address,code_address,content,id])
			console.log(insetArticleData)
			if(insetArticleData&&insetArticleData.insertId){
				res.send({
					code: 200,
					message: "发布成功",
				})
			}else{
				res.send({
					code: 400,
					message: "发布失败",
				})
			}
			
		
	}


}
module.exports = articleRelease
