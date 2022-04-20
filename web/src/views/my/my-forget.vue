<template>
	<div class="my-forget">
	   <el-form :model="data" label-width="120px">
		  <el-form-item label="邮箱">
			<el-input v-model="data.title" type="text" />
		  </el-form-item>
		  <el-form-item label="验证码">
		  	<el-input v-model="data.title" type="text" />
		  </el-form-item>
		  <el-form-item label="新密码">
			<el-input v-model="data.previewAdress" type="text" />
		  </el-form-item>
		  <el-form-item label="再次输入密码">
		  	<el-input v-model="data.previewAdress" type="text" />
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
	
	import type { UploadProps } from 'element-plus'
	
	const imageUrl = ref('')
	let data = reactive({
		title:"",
		previewAdress:"",
		codeAdress:"",
		describe:"",
	})
	const onSubmit = ()=>{
		
	}
	
	const handleAvatarSuccess: UploadProps['onSuccess'] = (
	  response,
	  uploadFile
	) => {
		console.log(uploadFile)
		
	  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
	}
	
	const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
	  if (rawFile.type !== 'image/jpeg'&&rawFile.type !== 'image/png') {
	    ElMessage.error('Avatar picture must be JPG format!')
	    return false
	  } else if (rawFile.size / 1024 / 1024 > 2) {
	    ElMessage.error('Avatar picture size can not exceed 2MB!')
	    return false
	  }
	  return true
	}
	
</script>

<style lang="scss">
	.my-forget{
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
