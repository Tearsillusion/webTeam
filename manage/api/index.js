
var express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express()
const fs = require('fs')
const path = require('path')
const useMysql = require('../mysql/index.js')
const redisClient = require("../redis/index.js")();
const authorization = require("../jwt/index.js");
const verification = require("./main/verification.js")
const sqlMain = require("./common/sql.js")
const formidable = require('formidable')
const moment = require('moment')
const selectUser = require("./common/selectUser.js")
const register = require("./main/register.js")
const login = require("./main/login.js")
const logout = require("./main/logout.js")
const alterPassword = require("./main/alterPassword.js")
const forgetPassword = require("./main/forgetPassword.js")
const updateImage = require("./main/updateImage.js")
const articleRelease = require("./main/articleRelease.js")
const articleList = require("./main/articleList.js")
const articleDetails = require("./main/articleDetails.js")
const myRelease = require("./main/myRelease.js")
const collection = require("./main/collection.js")
const myCollection = require("./main/myCollection.js")
const personal = require("./main/personal.js")
const comments = require("./main/comments.js")
const myComments = require("./main/myComments.js")

module.exports = function useApp(){
	const baseUrl = 'http://localhost:3000/'  
	app.all('*',function(req,res,next){
		res.header("Access-Control-Allow-Origin","*");
		res.header("Access-Control-Allow-Headers","X-Requested-With");
		res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
		res.header("X-Powered-By","3.2.1");
		res.header("Content-Type","application/json;charset=utf-8");
		console.log(req)
		// 读取图片
		if(req.url.indexOf('avatar/') > -1 || req.url.indexOf('articles/') > -1){
			res.setHeader("Content-Type","image/jpeg")
			fs.readFile(path.join(__dirname, req.url),'binary',function(err,file){
				if(err){
					console.log(err);
					res.end();
					return;
				}else{
					res.write(file,'binary');
					res.end();
				}
			});
			return;	
		}
		console.log(req.url)
		// 鉴权
		if(req.url!=="/"&&req.url.indexOf('favicon.ico') === -1&&req.url!=="/api/forgetPassword/"&&req.url!=="/api/verificationCode/"&&req.url!=="/api/login/"&&req.url!=="/api/register/"){
			const {authorization:token} = req.headers
			let result
			try{
				result = authorization.validationToken(token)
			}catch(e){
				//TODO handle the exception
			}
			if(!result){
				res.send({
					code: 401,
					message: "登录超时，请重新登录！",
				})
				return
			}
		}
		
		next();
		
	})
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(cors());
	
	// 获取验证码
	app.post("/api/verificationCode/",function(req,res){
		verification(req,res,redisClient,sqlMain)
	})
	// 注册
	app.post("/api/register/",function(req,res){
		register(req,res,redisClient,sqlMain)
	})
	// 登录
	app.post("/api/login/",function(req,res){
		login(req,res,authorization,sqlMain)
	})
	// 退出登录
	app.post("/api/logout/",function(req,res){
		logout(req,res,authorization,sqlMain,selectUser)
	})
	// 修改密码
	app.post("/api/alterPassword/",function(req,res){
		alterPassword(req,res,sqlMain,selectUser)
	})
	// 忘记密码
	app.post("/api/forgetPassword/",function(req,res){
		forgetPassword(req,res,authorization,sqlMain,redisClient)
	})
	// 我的发布
	app.get("/api/myRelease/",function(req,res){
		myRelease(req,res,sqlMain,moment,baseUrl,selectUser)
	})
	// 删除我的发布
	app.post("/api/deleteMyRelease/:id",function(req,res){
		myRelease(req,res,sqlMain,moment,baseUrl,selectUser)
	})
	// 获取给我的评论
	app.get("/api/myComments/",function(req,res){
		myComments(req,res,sqlMain,moment,baseUrl,selectUser)
	})
	// 收藏与取消收藏
	app.post("/api/collection/:id",function(req,res){
		collection(req,res,sqlMain,moment,baseUrl)
	})
	// 我的收藏
	app.get("/api/myCollection/",function(req,res){
		myCollection(req,res,sqlMain,moment,baseUrl,selectUser)
	})
	// 获取个人信息
	app.get("/api/personal/",function(req,res){
		personal(req,res,sqlMain,baseUrl,selectUser)
	})
	// 修改个人信息
	app.post("/api/personal/",function(req,res){
		personal(req,res,sqlMain,baseUrl,selectUser)
	})
	// 上传图片
	app.post("/api/updateImage/:img_path",function(req,res){
		updateImage(req,res,sqlMain,formidable,fs,path,baseUrl,selectUser)
	})
	// 文章发布
	app.post("/api/articleRelease/",function(req,res){
		articleRelease(req,res,sqlMain,moment,selectUser)
	})
	// 文章列表
	app.post("/api/articleList/:page",function(req,res){
		articleList(req,res,sqlMain,moment,baseUrl)
	})
	// 文章详情
	app.get("/api/articleDetails/:id",function(req,res){
		articleDetails(req,res,sqlMain,moment,baseUrl,selectUser)
	})
	// 获取评论
	app.get("/api/comments/:id",function(req,res){
		comments(req,res,sqlMain,moment,baseUrl,selectUser)
	})
	// 发表评论
	app.post("/api/comments/:id",function(req,res){
		comments(req,res,sqlMain,moment,baseUrl,selectUser)
	})
	// 删除评论
	app.post("/api/deleteComments/:id",function(req,res){
		comments(req,res,sqlMain,moment,baseUrl,selectUser)
	})
	return app
}
