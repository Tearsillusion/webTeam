<template>
	<div class="my-set">
		
		   <el-form :model="data" label-width="120px">
			   <el-form-item label="头像">
			     <el-upload
			         class="avatar-uploader"
			         action="##"
			         :show-file-list="false"
			         :http-request="httpRequest"
			         :before-upload="beforeAvatarUpload"
			       >
			         <img v-if="imageUrl" :src="imageUrl" class="avatar" />
			         <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
			       </el-upload>
			   </el-form-item>
		      <el-form-item label="昵称">
		        <el-input v-model="data.nickName" type="text" />
		      </el-form-item>
			  <el-form-item label="邮箱">
			    <el-input disabled v-model="data.email" type="text" />
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
	import {HttpUpdateImage,HttpPostPersonal,HttpPersonal} from '../../public/http'
	import type { UploadProps } from 'element-plus'
	import bus from '../../public/bus'
	
	const imageUrl = ref('')
	let data = reactive({
		nickName:"",
		email:"",
	})
	const onSubmit = ()=>{
		HttpPostPersonal({
			nick_name:data.nickName
		}).then((res:any)=>{
			if(res.code === 200){
				ElMessage({
				    message: '修改成功',
				    type: 'success',
				})
				bus.emit("reviseSuccess")
				return
			}
			
			ElMessage({
			    message: res.message,
			    type: 'warning',
			})
		})
	}
	const httpRequest = (files:any,uploadFile:any) => {
		let formdata = new FormData()
		formdata.append('files',files.file)
		HttpUpdateImage('avatar',formdata).then((res:any)=>{
			if(res.code === 200){
				imageUrl.value = res.data.file_path
				bus.emit("reviseSuccess")
				ElMessage({
				    message: '上传成功',
				    type: 'success',
				})
				return
			}
			ElMessage({
			    message: res.message,
			    type: 'warning',
			})
		})
	}
	// 获取个人信息
	HttpPersonal().then((res)=>{
		if(res.code === 200){
			data.nickName = res.data.nickName
			data.email = res.data.account
			imageUrl.value = res.data.avatar
		}
	})
	
	const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
	  if (rawFile.type !== 'image/jpeg'&&rawFile.type !== 'image/png') {
	    ElMessage.error('头像必须是JPG/PNG!')
	    return false
	  } 
	  return true
	}
	
</script>

<style lang="scss">
	.my-set{
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
				height: 100%;
				img{
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
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
