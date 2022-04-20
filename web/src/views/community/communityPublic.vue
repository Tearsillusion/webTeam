<template>
	<div class="community-public">
		
		   <el-form :model="data" label-width="120px">
			   <el-form-item label="展示图片">
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
		      <el-form-item label="标题">
		        <el-input v-model="data.title" type="text" />
		      </el-form-item>
			  <el-form-item label="预览地址">
			    <el-input v-model="data.previewAdress" type="text" />
			  </el-form-item>
			  <el-form-item label="源码地址">
			    <el-input v-model="data.codeAdress" type="text" />
			  </el-form-item>
			  <el-form-item label="描述">
			    <el-input v-model="data.describe" type="textarea" />
			  </el-form-item>
		      <el-form-item>
		        <el-button type="primary" @click="onSubmit" :loading="loading">{{data.publicText}}</el-button>
		      </el-form-item>
		    </el-form>
	</div>
</template>

<script lang="ts" setup>
	import { ref,reactive } from 'vue'
	import { ElMessage } from 'element-plus'
	import { Plus } from '@element-plus/icons-vue'
	import type { UploadProps } from 'element-plus'
	import {HttpArticleRelease,HttpUpdateImage} from '../../public/http'
	import { inject } from "vue";
	import bus from '../../public/bus'
	const router = inject('router')
	
	let imageUrl = ref('')
	let loading = ref(false)
	let data = reactive({
		img_name:"",
		title:"",
		previewAdress:"",
		codeAdress:"",
		describe:"",
		publicText:"发布",
	})
	const onSubmit = ()=>{
		if(!data.title){
			ElMessage({
			    message: '请输入文章标题!',
			    type: 'warning',
			})
		}else if(!data.describe){
			ElMessage({
			    message: '请填写描述信息!',
			    type: 'warning',
			})
		}else{
			data.publicText = "发布中..."
			loading.value = true
			HttpArticleRelease({
				image_name:data.img_name,
				title:data.title,
				priview_address:data.previewAdress,
				code_address:data.codeAdress,
				content:data.describe,
			}).then((res:any)=>{
				data.publicText = "发布"
				loading.value = false
				if(res.code === 200){
					ElMessage({
					    message: '发布成功',
					    type: 'success',
					})
					bus.emit("reviseSuccess")
					router.push("/community")
					return
				}
				ElMessage({
				    message: res.message,
				    type: 'warning',
				})
			})
		}
	}
	
	const httpRequest = (files:any,uploadFile:any) => {
		let formdata = new FormData()
		formdata.append('files',files.file)
		HttpUpdateImage('articles',formdata).then((res:any)=>{
			if(res.code === 200){
				imageUrl.value = res.data.file_path
				data.img_name = res.data.file_name
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
	
	const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
	  if (rawFile.type !== 'image/jpeg'&&rawFile.type !== 'image/png') {
	    ElMessage.error('头像必须是JPG/PNG!')
	    return false
	  } 
	  return true
	}
	
</script>

<style lang="scss">
	.community-public{
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
