const updateImage =  (req, res,sqlMain,formidable,fs,pathModules,baseUrl,selectUser) => {
	res.status(200)
	// path:文件夹路径
	// file：file文件
	// img_path:路径参数
	// avatar 头像 articles文章图片
	
	const form = new formidable.IncomingForm();
	const {img_path} = req.params
	console.log(img_path)
	form.parse(req,(err,fields,files)=>{
		if (err) {
			return;
		}
		console.log(files)
		if (!files) {
			res.json({
				code: 400,
				message: "图片不能为空",
			})
		} else {
			if(img_path === 'avatar' || img_path === 'articles'){
				const dirname = pathModules.dirname(__dirname)
				const storePath = pathModules.join(dirname, img_path);
				const image = pathModules.join(storePath);
				const file = files.files;
				
				const {originalFilename,filepath} = file
				
				//判断文件夹是否存在
				if (!fs.existsSync(image)) {
					fs.mkdirSync(image)
				}
				 //获取时间戳
				let date = new Date().getTime();
				//产生随机数
				let random = Math.floor(Math.random() * 10000);
				//获取图片的后缀
				let ext = pathModules.extname(originalFilename);
				//图片的名称
				let imageName = date + random + ext;
				//图片的读和写
				let read = fs.createReadStream(filepath);
				
				let write = fs.createWriteStream(pathModules.join(image, imageName));
				read.on('end', async (err,result) => {
					const img_data = {
						file_path:baseUrl+img_path+'/'+imageName,
						file_name:imageName
					}
					if(img_path === 'avatar'){
						// 头像存储
						const {id} = await selectUser(req,res,sqlMain)
						const updateAvatarResult = await sqlMain.updateSql('user','avatar = ?','Id',[imageName,id])
						if(updateAvatarResult.changedRows){
							res.send({
								code: 200,
								data:img_data,
								message: "头像修改成功！",
							})
						}else{
							res.send({
								code: 400,
								message: "头像修改失败！",
							})
						}
						
						
						
					}else{
						res.send({
							code: 200,
							data:img_data,
							message: "图片上传成功！",
						})
					}
					
				});
				read.pipe(write);	
			}else{
				res.json({
					code: 400,
					message: "图片路径不存在",
				})
			}
		}
	})
}
module.exports = updateImage
