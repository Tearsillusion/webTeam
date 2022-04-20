import HTTP from './axios'
import { Ref } from 'vue'
// 登录
export  function HttpLogin(params: object){
	return HTTP.POST('/login/',params)
}
// 退出登录
export  function HttpLogout(){
	return HTTP.POST('/logout/')
}
// 注册
export  function HttRegister(params: object){
	return HTTP.POST('/register/',params)
}
// 获取验证码
export  function HttpVerificationCode(params?: object){
	return HTTP.POST('/verificationCode/',params)
}
// 修改密码
export  function HttpAlterPassword(params?: object){
	return HTTP.POST('/alterPassword/',params)
}
// 忘记密码
export  function HttpForgetPassword(params?: object){
	return HTTP.POST('/forgetPassword/',params)
}
// 我的发布
export  function HttpMyRelease(){
	return HTTP.GET('/myRelease/')
}
// 删除我的发布
export  function HttpDeleteMyRelease(id:number){
	return HTTP.POST('/deleteMyRelease/'+id)
}
// 我的评论
export  function HttpMyComments(){
	return HTTP.GET('/myComments/')
}

// 收藏与取消收藏
export  function HttpCollection(id:number,params?: object){
	return HTTP.POST('/collection/'+id,params)
}
// 我的收藏
export  function HttpMyCollection(){
	return HTTP.GET('/myCollection/')
}
// 获取个人信息
export  function HttpPersonal(){
	return HTTP.GET('/personal/')
}
// 修改个人信息
export  function HttpPostPersonal(params?: object){
	return HTTP.POST('/personal/',params)
}
// 上传图片
export  function HttpUpdateImage(img_path:string,params?: object){
	return HTTP.POST('/updateImage/'+img_path,params,true)
}
// 文章发布
export  function HttpArticleRelease(params?: object){
	return HTTP.POST('/articleRelease/',params)
}
// 文章列表
export  function HttpArticleList(page:number,params?: object){
	return HTTP.POST('/articleList/'+page,params)
}
// 文章详情
export  function HttpArticleDetails(id:number){
	return HTTP.GET('/articleDetails/'+id)
}
// 获取评论
export  function HttpComments(id:number){
	return HTTP.GET('/comments/'+id)
}
// 发表评论
export  function HttpPostComments(id:number,params?: object){
	return HTTP.POST('/comments/'+id,params)
}
// 删除评论
export  function HttpDeleteComments(id:number){
	return HTTP.POST('/deleteComments/'+id)
}