<template>
	<div class="login">
		<h2>WEB战略研讨交流网站</h2>
		<div class="web-team-login-right-center">
			<el-input v-model="data.email" @keypress.native.enter="loginClick" type="text" placeholder="请输入账号(邮箱)" />
			<el-input v-model="data.password" @keypress.native.enter="loginClick" type="password" placeholder="请输入密码"  />
			<el-button type="primary" @click="loginClick" :loading="loading">{{loginText}}</el-button>
			<div class="forget-password">
				<el-checkbox v-model="data.checked">记住密码</el-checkbox>
				<router-link to="/forgetIndex">忘记密码?</router-link>
			</div>
		</div>
		<div class="web-team-login-right-register">
			<span>还没有账号？<router-link to="/register">去注册</router-link></span>
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
	import {HttpLogin} from '../public/http'
	import { inject } from "vue";
	const store = inject('store')
	const router = inject('router')
	
	let loading = ref(false)
	let loginText = ref("登录")
	
	let data = reactive({
		email:'',
		password:'',
		checked:false
	})
	if(store.state.userInfoX&&store.state.userInfoX.checked){
		data.checked = true
		data.email = store.state.userInfoX.account
	}
	
	
	const loginClick = ()=>{
		if(!data.email){
			ElMessage({
			    message: '请输入账号!',
			    type: 'warning',
			})
		}else if(!data.password){
			ElMessage({
			    message: '请输入密码!',
			    type: 'warning',
			})
		}else{
			loginText.value = "登录中..."
			loading.value = true
			HttpLogin({
				email:data.email,
				password:data.password,
			}).then((res:any)=>{
				loginText.value = "登录"
				loading.value = false
				if(res.code === 200){
					if(data.checked){
						res.data['checked'] = true
					}
					store.commit('userInfoMain',JSON.stringify(res.data))
					ElMessage({
					    message: '恭喜您登录成功!',
					    type: 'success',
					})
					router.push('/community')
					return;
				}
				
				ElMessage({
				    message: res.message,
				    type: 'warning',
				})
			})
			
		}
	}
</script>

<style lang="scss">
	.login {
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
