<template>
	<div class="my-star">
		<list :data="collectionData" @delete="deleteRelease" :deleteShow="true"></list>
		<div v-if="collectionData.length===0" class="no-data">
			<img src="../../assets/image/noData.png" >
			<p>你还没有收藏任何文章，快去收藏吧！</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import list from '../../component/list.vue'
	import {HttpMyCollection,HttpCollection} from '../../public/http'
	import {onMounted,ref} from 'vue'
	import { ElMessage, ElMessageBox } from 'element-plus'
	
	let collectionData = ref([])
	
	// 我的收藏
	const releaseMain = ()=>{
		HttpMyCollection().then((res:any)=>{
			if(res.code === 200){
				collectionData.value = res.data.acticleDetail
			}
		})
	}
	// 取消收藏
	const deleteRelease = (id)=>{
		ElMessageBox.confirm(
			'你确定要删除此收藏嘛？',
			'警告',
			{
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning',
			}
		  ).then(() => {
				HttpCollection(id,{
					status:0
				}).then((res:any)=>{
					if(res.code === 200){
						ElMessage({
						  message: `删除成功`,
						  type: 'success',
						})
						releaseMain()
						return
					}
					ElMessage({
					  message: `删除失败`,
					  type: 'warning',
					})
				})
		})
		
		
	}
	onMounted(()=>{
		releaseMain()
	})
	
</script>

<style lang="scss">
	.my-star{
		width: 100%;
		height: 100%;
	}
</style>
