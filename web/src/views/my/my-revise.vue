<template>
	<div class="my-revise">
	   <el-form  label-width="120px">
		  <el-form-item label="旧密码">
			<el-input v-model="data.oldPassowrd" type="password" />
		  </el-form-item>
		  <el-form-item label="新密码">
			<el-input v-model="data.newPassword" type="password" />
		  </el-form-item>
		  <el-form-item label="再次输入密码">
		  	<el-input v-model="data.againPassword" type="password" />
		  </el-form-item>
		  <el-form-item>
			<el-button type="primary" @click="onSubmit">提交</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script lang="ts" setup>
	import { ref,reactive } from 'vue'
	import { ElMessage } from 'element-plus'
	import { Plus } from '@element-plus/icons-vue'
	import {HttpAlterPassword} from '../../public/http'
	import type { UploadProps } from 'element-plus'
	import { inject } from "vue";
	const store = inject('store')
	const router = inject('router')
	
	
	let data = reactive({
		oldPassowrd:"",
		newPassword:"",
		againPassword:"",
	})
	const onSubmit = ()=>{
		if(!data.oldPassowrd){
			ElMessage({
			    message: '请输入旧密码!',
			    type: 'warning',
			})
		}else if(!data.newPassword){
			ElMessage({
			    message: '请输入旧密码!',
			    type: 'warning',
			})
		}else if(data.newPassword!==data.againPassword){
			ElMessage({
			    message: '两次密码不一致!',
			    type: 'warning',
			})
		}else{
			HttpAlterPassword({
				oldPassword:data.oldPassowrd,
				newPassword:data.newPassword,
			}).then((res:any)=>{
				if(res.code === 200){
					ElMessage({
					    message: '密码修改成功，请重新登录',
					    type: 'success',
					})
					store.commit('logoutMain',false)
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
	.my-revise{
		width: 50%;	
		height: 100%;
		.avatar-uploader{
		  width: 178px;
		  height: 178px;
		  display: block;
		  text-align: center;
		  line-height: 178px;
		  font-size: 30px;
		  border: 1px;
		  color: #8c939d;
		    border: 1px dashed #d9d9d9;
		    border-radius: 6px;
		    cursor: pointer;
			.el-upload{
				width: 100%;
			}
		}
		.el-form{
			margin-top: 30px;
			input{
				width: 300px;
				height: 40px;
			}
			textarea{
				width: 500px;
				height: 200px;
			}
		}
	}
</style>
