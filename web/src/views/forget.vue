<template>
	<div class="forget">
		<h2>忘记密码</h2>
		<div class="web-team-login-right-center">
			<el-input v-model="data.email" @keypress.native.enter="loginClick" type="text" placeholder="请输入邮箱"  />
			<div class="web-team-login-right-center-code">
				<el-input v-model="data.code" @keypress.native.enter="loginClick" type="text" placeholder="请输入验证码"  />
				<span @click="codeClick">{{data.codeText}}</span>
			</div>
			<el-input v-model="data.password" @keypress.native.enter="loginClick" type="password" placeholder="请输入密码"  />
			<el-input v-model="data.againPassword" @keypress.native.enter="loginClick" type="password" placeholder="请再次输入密码"  />
			<el-button type="primary" @click="forgetClick" :loading="loading">{{data.forgetText}}</el-button>
		</div>
		<div class="web-team-login-right-register">
			<span>想起密码？<router-link to="/login">去登录</router-link></span>
		</div>
		<div class="web-team-login-right-info">
			与一群有梦想的人，做一件有意义的事<br />
			加入我们 QQ：639603060
		</div>
	</div>
</template>

<script lang="ts" setup>
	import {ref,reactive} from 'vue'
	import { ElMessage} from 'element-plus'
	import { useRouter } from 'vue-router'
	import {HttpForgetPassword} from '../public/http'
	import {useCode} from './main/useCode'
	const router = useRouter();
	
	let username = ref("")
	let password = ref("")
	let code = ref("")
	let loading = ref(false)
	let loginText = ref("提交")
	let isCode = ref(false)
	let data = reactive({
		codeText:'发送验证码',
		forgetText:'提交',
		email:"",
		code:"",
		password:"",
		againPassword:"",
	})
	// 请求验证码
	const codeClick = ()=>{
		useCode(data.email,(res)=>{
			data.codeText = res
		})
	}
	
	
	const forgetClick = ()=>{
		if(!data.email){
			ElMessage({
			    message: '请输入邮箱!',
			    type: 'warning',
			})
		}else if(!data.code){
			ElMessage({
			    message: '请输入验证码!',
			    type: 'warning',
			})
		}else if(!data.password){
			ElMessage({
			    message: '请输入密码!',
			    type: 'warning',
			})
		}else if(data.password!==data.againPassword){
			ElMessage({
			    message: '两次密码不一致!',
			    type: 'warning',
			})
		}else{
			
			loading.value = true
			data.forgetText = "修改中..."
			HttpForgetPassword({
				email:data.email,
				code:data.code,
				password:data.password,
			}).then((res:any)=>{
				loading.value = false
				data.forgetText = "提交"
				if(res.code === 200){
					ElMessage({
					    message: '恭喜您密码找回成功，赶快登录吧!',
					    type: 'success',
					})
					router.push('/login')
					
					return;
				}
				
				ElMessage({
				    message: res.message,
				    type: 'success',
				})
			})
		}
	}
</script>

<style lang="scss">
	.forget {
		width: 50%;
		height: 100%;
		padding: 50px 30px;
		box-sizing: border-box;
		vertical-align: top;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		h2 {
			text-align: center;
			font-size: 42px;
			letter-spacing: 1px;
		}

		.web-team-login-right-center {
			width: 50%;
			margin: 0 auto;
			display: flex;
			flex-direction: column;
			align-items: center;

			input {
				width: 100%;
				height: 50px;
				margin-bottom: 30px;
			}

			button {
				width: 100%;
				height: 50px;
				margin: 0 auto;
				font-size: 20px;
				color: white;
			}

			.forget-password {
				width: 100%;
				display: flex;
				justify-content: space-between;
				margin-top: 10px;

				a {
					color: rgb(58, 142, 230);
				}


			}
			.web-team-login-right-center-code{
				width: 100%;
				height: 50px;
				display: flex;
				justify-content: space-between;
				margin-bottom: 30px;
				span{
					width: 150px;
					height: 100%;
					line-height: 50px;
					font-size: 16px;
					text-align: center;
					display: inline-block;
					color: white;
					background-color: rgb(58, 142, 230);
					cursor: pointer;
				}
			}
		}

		.web-team-login-right-register {
			margin-top: 30px;

			a {
				color: #3a8ee6;
			}
		}

		.web-team-login-right-info {
			text-align: center;
			font-size: 15px;
			letter-spacing: 1px;
			margin-top: 30px;
		}

	}
</style>
