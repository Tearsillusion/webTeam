<template>
	<div class="personal-details">
		<div class="personal-details-photo" @click="linkClick('set')">
			<el-avatar :size="50" :src="data.userInfo.avatar?data.userInfo.avatar:require('../../assets/image/defalut.png')" @error="(e)=>{e.target.src = require('../../assets/image/defalut.png')}" />
			<h2>{{data.userInfo.nickName}}</h2>
		</div>
		<div class="personal-details-public">
			<div class="personal-details-public-list hoverActive" @click="linkClick('public')">
				<strong>{{data.userInfo.releaseCount}}</strong>
				<span>我的发布</span>
			</div>
			<div title="别人给我的评论" class="personal-details-public-list hoverActive" @click="linkClick('news')">
				<strong>{{data.userInfo.commentsCount}}</strong>
				<span>我的评论</span>
			</div>
			<div title="我的收藏" class="personal-details-public-list hoverActive" @click="linkClick('star')">
				<strong>{{data.userInfo.collectionCount}}</strong>
				<span>我的收藏</span>
			</div>
			<div title="发布作品" class="personal-details-go-public hoverActive" @click="linkClick('communityPublic')">
				+
			</div>
		</div>
		<div class="personal-details-customer-service">
			<img src="../../assets/image/customer-service.png" >
			<p>你有什么问题，点击联系我们吧!</p>
			<el-button type="primary">联系我们</el-button>
		</div>
		
		
		
		<div class="personal-details-logout">
			<el-button type="primary" @click="linkClick('revise')">修改密码</el-button>
			<el-button type="primary" @click="linkClick(false)">退出登录</el-button>
		</div>
		
	</div>
</template>

<script lang="ts" setup>
	import { reactive,onMounted,onUnmounted } from 'vue'
	import { inject } from "vue";
	import {HttpPersonal} from '../../public/http'
	import bus from '../../public/bus'
	const store = inject('store')
	const router = inject('router')
	

	let data = reactive({
		userInfo:{} as any
	})
	const linkClick = (path)=>{
		if(path){
			router.push(`/${path}`)
			return
		}
		store.commit("logoutMain",true)
	}
	const personalMain = ()=>{
		HttpPersonal().then((res)=>{
			if(res.code === 200){
				data.userInfo = res.data
				let oldUserInfo = store.state.userInfoX
				oldUserInfo.nickName = res.data.nickName
				store.commit("userInfoMain",JSON.stringify(oldUserInfo))
			}
			console.log(res)
		})
	}
	 
	bus.on("reviseSuccess",personalMain)
	onUnmounted(()=>{
		bus.on("reviseSuccess",personalMain)
	})
	onMounted(()=>{
		personalMain()
	})
</script>

<style lang="scss">
	.personal-details{
		position: relative;
		width: 100%;
		height: 100%;
		&-photo{
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			padding: 20px;
			box-sizing: border-box;
			cursor: pointer;
			h2{
				width: 90%;
				font-size: 12px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				text-align: center;
			}
		}
		&-public{
			display: flex;
			justify-content: space-around;
			.personal-details-public-list{
				display: flex;
				flex-direction: column;
				text-align: center;
				cursor: pointer;
				strong{
					font-size: 18px;
				}
				span{
					font-size: 12px;
				}
			}
			.personal-details-go-public{
				position: fixed;
				bottom: 50px;
				right: 50px;
				width: 60px;
				height: 60px;
				box-shadow: 0 0 20px 0 #aaa;
				text-align: center;
				line-height: 60px;
				font-size: 30px;
				border-radius: 60%;
				z-index: 8;
			}
		}
		&-customer-service{
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			margin-top: 100px;
			img{
				width: 50%;
			}
		}
		&-logout{
			width: 100%;
			position: absolute;
			bottom: 0;
			button{
				width: 100%;
				height: 50px;
				border: 0;
				border-bottom: 1px solid #ccc;
				color: #222;
				border-radius: 0;
				background-color: transparent;
				margin: 0!important;
				text-align: center;
				
			}
		}
	}
	
</style>
