<template>
	<div class="my-public">
		<list :data="communityData" @delete="deleteRelease" :deleteShow="true"></list>
		<div v-if="communityData.length===0" class="no-data">
			<img src="../../assets/image/noData.png" >
			<p>您还没有发布的文章，快去发布吧！</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import list from '../../component/list.vue'
	import {HttpMyRelease,HttpDeleteMyRelease} from '../../public/http'
	import {onMounted,ref} from 'vue'
	import { ElMessage, ElMessageBox } from 'element-plus'
	import bus from '../../public/bus'
	
	let communityData = ref([])
	
	const releaseMain = ()=>{
		HttpMyRelease().then((res:any)=>{
			if(res.code === 200){
				communityData.value = res.data.acticleDetail
			}
		})
	}
	const deleteRelease = (id)=>{
		ElMessageBox.confirm(
			'你确定要删除此发布嘛，一旦删除无法撤销',
			'警告',
			{
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning',
			}
		  ).then(() => {
			 HttpDeleteMyRelease(id).then((res:any)=>{
			 	if(res.code === 200){
			 		ElMessage({
			 		  message: `删除成功`,
			 		  type: 'success',
			 		})
			 		releaseMain()
					bus.emit("reviseSuccess")
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
		releaseMain()
	})
	
</script>

<style lang="scss">
	.my-public{
		width: 100%;
		height: 100%;
		
	}
</style>
