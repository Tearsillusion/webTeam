<template>
	<div class="community-detail" v-if="isDelete">
		<div class="community-detail-photo">
			<el-avatar :size="50" :src="data.communityDetail.avatar?data.communityDetail.avatar:require('../../assets/image/icon-defalut.png')" @error="(e)=>{e.target.src = require('../../assets/image/icon-defalut.png')}" />
			<div class="line-list-icon-title">
				<h2>{{data.communityDetail.nickName}}</h2>
				<p>{{data.communityDetail.create_time}}</p>
			</div>
		</div>
		<el-card>
		  <img
			:src="data.communityDetail.image_path"
			v-if="data.communityDetail.image_path"
			@error="(e)=>{data.communityDetail.image_path = null}"
			class="image"
		  />
		  <div class="el-card-info">
		    <div class="el-card-info-title">
			  <strong>{{data.communityDetail.title}}</strong>
		    </div>
			<div class="el-card-info-operation">
			   <span class="hoverActive" @click="priviewClick"><el-icon><platform /></el-icon>预览</span>
			   <span class="hoverActive" @click="codeClick"><el-icon><download /></el-icon>源码</span>
			   <span class="hoverActive" @click="commitClick"><el-icon><chat-dot-square /></el-icon>评论</span>
			   <span class="hoverActive" @click="collectionClick"><el-icon><star /></el-icon>{{data.communityDetail.star_status?'已收藏':'收藏'}}</span>
			</div>
			<div class="bottom">
			  <p>{{data.communityDetail.content}}</p>
			</div>
		  </div>
		</el-card>
		<!-- 留言 -->
		<div class="line-list" v-for="item in data.commentsData">
			<div class="line-list-icon">
				<div class="line-list-icon-left">
					<el-avatar :size="35" :src="item.avatar" />
					<div class="line-list-icon-title">
						<h2>{{item.nickName}}</h2>
						<p>{{item.create_time}}</p>
					</div>
				</div>
				<span v-if="item.nickName === store.state.userInfoX.nickName" class="hoverActive" @click="deleteClick(item.id)">删除</span>
			</div>
			<div class="line-list-info">
				{{item.content}}
			</div>
		</div>
		<div v-if="data.commentsData.length === 0" class="no-data">
			<img src="../../assets/image/noData.png" >
			<p>还没有人评论，快去抢个沙发吧！</p>
		</div>
	</div>
	<div v-else class="no-data">
		<img src="../../assets/image/noData.png" >
		<p>此文章已被作者删除</p>
	</div>
</template>

<script lang="ts" setup>
	import {Platform,Download,ChatDotSquare,Star} from '@element-plus/icons-vue'
	import { ref,reactive,onMounted} from 'vue'
	import { ElMessage, ElMessageBox } from 'element-plus'
	import {HttpArticleDetails,HttpCollection,HttpComments,HttpPostComments,HttpDeleteComments} from '../../public/http'
	import {useRoute} from 'vue-router'
	import { inject } from "vue";
	import bus from '../../public/bus'
	
	const store = inject('store')
	const router = useRoute()
	
	const article_id = router.query.id
	let isDelete = ref(true)
	let data = reactive({
		communityDetail:{} as any,
		commentsData:[] as any
	})
	// 文章详情
	const articleDetailMain = ()=>{
		HttpArticleDetails(article_id).then((res:any)=>{
			if(res.code === 200){
				data.communityDetail = res.data.acticleDetail[0]
			}else{
				isDelete.value = false
				ElMessage({
				  message: res.message,
				  type: 'warning',
				})
			}
		})
	}
	
	// 评论详情
	const commentsMain = ()=>{
		HttpComments(article_id).then((res:any)=>{
			if(res.code === 200){
				data.commentsData = res.data.commentsData
			}
		})
	}
	// 发表评论接口
	const sendComments = (content)=>{
		HttpPostComments(article_id,{
			content:content
		}).then((res:any)=>{
			if(res.code === 200){
				ElMessage({
				  message: `评论成功`,
				  type: 'success',
				})
				commentsMain()
				bus.emit("reviseSuccess")
				return;
			}
			ElMessage({
			  message: `评论失败`,
			  type: 'warning',
			})
		})
	}
	// 评论
	const commitClick = ()=>{
		ElMessageBox.prompt('请输入您的评论', '评论', {
		    confirmButtonText: '确定',
		    cancelButtonText: '取消',
		    inputErrorMessage: '请输入您的评论',
		  })
		.then(({ value }) => {
			
		  sendComments(value)
		  
		})
		.catch(() => {
		 
		})
	}
	// 预览
	const priviewClick = ()=>{
		const {priview_address} = data.communityDetail
		if(priview_address && priview_address.indexOf('http://') > -1||priview_address.indexOf('https://') > -1){
			window.open(priview_address)
			return
		}
		ElMessage({
		  message: `暂无预览地址`,
		  type: 'warning',
		})
	}
	// 源码地址
	const codeClick = ()=>{
		const {code_address} = data.communityDetail
		if(code_address){
		  const oInput = document.createElement('input')
		  oInput.value = code_address
		  document.body.appendChild(oInput)
		  oInput.select()
		  document.execCommand('Copy')
		  oInput.style.display = 'none'
		  document.body.removeChild(oInput)
			ElMessage({
			  message: `复制成功`,
			  type: 'success',
			})
			return
		}
		ElMessage({
		  message: `暂无预览地址`,
		  type: 'warning',
		})
	}
	// 收藏
	const collectionClick = ()=>{
		let {star_status} = data.communityDetail
		if(star_status){
			star_status = 0
		}else{
			star_status = 1
		}
		HttpCollection(article_id,{
			status:star_status
		}).then((res:any)=>{
			if(res.code === 200){
				ElMessage({
				  message: `${star_status?'收藏成功':'已取消收藏'}`,
				  type: 'success',
				})
				data.communityDetail.star_status = star_status
				bus.emit("reviseSuccess")
				return
			}
			ElMessage({
			  message: `操作失败`,
			  type: 'warning',
			})
		})
	}
	// 删除评论
	const deleteClick = (id)=>{
		ElMessageBox.confirm(
			'你确定要删除此评论嘛，一旦删除无法撤销',
			'警告',
			{
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning',
			}
		  ).then(() => {
			 HttpDeleteComments(id).then((res:any)=>{
			 	if(res.code === 200){
			 		ElMessage({
			 		  message: `删除成功`,
			 		  type: 'success',
			 		})
					bus.emit("reviseSuccess")
			 		commentsMain()
			 		return
			 	}
			 	ElMessage({
			 	  message: `删除失败`,
			 	  type: 'success',
			 	})
			 })
		})
		
		
	}
	
	onMounted(()=>{
		articleDetailMain()
		commentsMain()
	})
	
</script>

<style lang="scss" >
	.community-detail{
		width: 60%;
		height: 100%;
		overflow: auto;
		margin: 0 auto;
		.no-data{
			height: 50%;
		}
		.community-detail-photo{
			width: 100%;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			flex-direction: row;
			border-radius: 0;
			.line-list-icon-title{
				 margin-left: 5px;
				 display: flex;
				 align-items: flex-start;
				 flex-direction: column;
				 width: calc(100% - 80px);
				h2{
					width: 100%;
					font-size: 18px;
					margin: 0;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			  p{
				font-size: 12px;
				margin: 0;
			  }
			}
		}
		.el-card{
			width: 100%;
			height: auto;
			box-shadow: none;
			border: 0;
			margin: 0;
			border-radius: 0;
			border-bottom: 10px solid #eee;
			
			.el-card__body{
				width: 100%;
				height: 100%;
				padding: 0;
				border-radius: 0;
				font-size: 0;
				img{
					width: 100%;
					height: auto;
					border-radius: 0;
				}
				.el-card-info{
					padding: 10px;
					box-sizing: border-box;
					span{
						opacity: 1;
					}
					.el-card-info-title{
						display: flex;
						justify-content: space-between;
						strong{
							font-size: 20px;
						}
						span{
							font-size: 12px;
						}
					}
					.el-card-info-operation{
						margin-top: 20px;
						display: flex;
						justify-content: flex-start;
						span{
							font-size: 18px;
							margin-right: 30px;
							cursor: pointer;
							color: #409eff;
							display: flex;
							align-items: center;
						}
					}
					
					p{
						font-size: 16px;
						letter-spacing: 1px;
					}
				}
			}
		}
		.line-list{
			width:100%;
			border-radius: 5px;
			padding:0 20px 20px 20px;
			box-sizing: border-box;
			border-bottom: 1px solid #eee;
			box-shadow: none;
			clear: both;
			&:last-child{
				margin-bottom: 400px;
			}
			 &-icon{
				 width: 100%;
				 display: flex;
				 justify-content: space-between;
				 align-items: center;
				 flex-direction: row;
				 &-left{
					 display: flex;
					 justify-content: flex-start;
					 align-items: center;
					 flex-direction: row;
					 width: calc(100% - 40px);
				 }
				 .hoverActive{
					 width: 40px;
					 height: 25px;
					 background: #409eff;
					 color: white;
					 text-align: center;
					 line-height: 25px;
					 border-radius: 20px;
					 float: right;
					 font-size: 12px;
				 }
				 
				 &-title{
					 margin-left: 5px;
					 display: flex;
					 align-items: flex-start;
					 flex-direction: column;
					 padding: 20px 0;
					 letter-spacing: 1px;
					 width: calc(100% - 200px);
					h2{
						width: 100%;
						font-size: 12px;
						margin: 0;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				   p{
						font-size: 12px;
						margin: 0;
				   }
				 }
			 }
			 
			 &-info{
				 width: 100%;
				 padding-left: 50px;
				 box-sizing: border-box;
				 font-size: 16px;
				 letter-spacing: 1px;
			 }
			 .line-list-title{
				 background-color: #eee;
				 padding: 5px;
				 box-sizing: border-box;
				 cursor: pointer;
				 margin-top: 10px;
				 letter-spacing: 1px;
			 }
		}
	}
</style>
