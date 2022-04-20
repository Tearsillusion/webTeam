<template>
	<div class="my-news">
		<lineList :data="commentsData" ></lineList>
		<div v-if="commentsData.length===0" class="no-data">
			<img src="../../assets/image/noData.png" >
			<p>还没有人给您评论！</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import lineList from '../../component/lineList.vue'
	
	import {HttpMyComments} from '../../public/http'
	import {onMounted,ref} from 'vue'
	
	let commentsData = ref([])
	
	const releaseMain = ()=>{
		HttpMyComments().then((res:any)=>{
			if(res.code === 200){
				commentsData.value = res.data.myCommentsData
			}
		})
	}
	onMounted(()=>{
		releaseMain()
	})
	
</script>

<style lang="scss">
	.my-news{
		width: 100%;
		height: 100%;
		padding: 30px;
		box-sizing: border-box;
	}
</style>
