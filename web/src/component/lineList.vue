<template>
	<div class="line-list" v-for="item in data">
		<div class="line-list-icon">
			<el-avatar :size="50" :src="item.avatar" />
			<div class="line-list-icon-title">
				<h2>{{item.nickName}}</h2>
				<p>{{item.create_time}}</p>
			</div>
		</div>
		<div class="line-list-info">
			{{item.content}}
		</div>
		<div class="line-list-title" @click="communityClick(item)">
			标题：{{item.title}}
		</div>
	</div>
</template>

<script lang="ts" setup>
	import {reactive} from 'vue'
	import { useRouter } from 'vue-router'
	const router = useRouter();
	const props = defineProps({
		data: Array,
	})
	const communityClick = (item)=>{
		router.push({ path: '/communityDetail', query: { id: item.community_id }})
	}
</script>

<style lang="scss">
	.line-list{
		width:100%;
		box-shadow:  0 0 10px 0 #aaa;
		border-radius: 5px;
		padding: 20px;
		box-sizing: border-box;
		margin-bottom: 20px;
		 &-icon{
			 width: 100%;
			 display: flex;
			 justify-content: flex-start;
			 align-items: center;
			 flex-direction: row;
			 
			 
			 &-title{
				 margin-left: 5px;
				 display: flex;
				 align-items: flex-start;
				 flex-direction: column;
				 padding: 20px 0;
				h2{
					font-size: 12px;
					margin: 0;
				}
			   p{
					font-size: 12px;
					margin: 0;
			   }
			 }
		 }
		 
		 &-info{
			 width: 100%;
			 margin-top: 10px;
			 
		 }
		 .line-list-title{
			 background-color: #eee;
			 padding: 5px;
			 box-sizing: border-box;
			 cursor: pointer;
			 margin-top: 10px;
		 }
	}
</style>
