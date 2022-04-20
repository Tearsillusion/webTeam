<template>
	<div class="community">
		<div class="community-input">
			<el-input
			      v-model="seachValue"
			      placeholder="请输入搜索内容回车确定"
				  @keyup.enter.native="seachClick"
			    />
		</div>
		<div class="community-list">
			<list :data="communityData"></list>
		</div>
		<div class="community-page">
			<div class="community-page-left">
				<span>共{{totalCount}}条</span>
				<span>当前第{{currentPage}}页</span>
			</div>
			<div class="community-page-right">
				<el-pagination background layout="prev, pager, next" :page-size="20" :total="totalCount" @current-change="currentChange"  />
			</div>
			
		</div>
	</div>
</template>

<script lang="ts" setup>
	import {ref,onMounted} from 'vue'
	import list from '../../component/list.vue'
	import {HttpArticleList} from '../../public/http'
	import { ElMessage, ElMessageBox } from 'element-plus'
	
	let communityData = ref([])
	let currentPage = ref(0)
	let totalPage = ref(0)
	let totalCount = ref(0)
	let seachValue = ref("")
	
	
	// 文章列表
	const communityMain = (page)=>{
		HttpArticleList(page,{
			key_word:seachValue.value
		}).then((res:any)=>{
			if(res.code === 200){
				communityData.value = res.data.acticleData
				currentPage.value = res.data.current_page
				totalPage.value = res.data.total_page
				totalCount.value = res.data.total_count
			}
		})
	}
	// 搜索点击
	const seachClick = ()=>{
		communityMain(1)
	}
	// 分页点击
	const currentChange = (page)=>{
		communityMain(page)
	}
	
	onMounted(()=>{
		communityMain(1)
	})
	
</script>

<style lang="scss">
	.community{
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.community-input{
			width: 100%;
			height: 60px;
			input{
				width: 200px;
			}
		}
		.community-list{
			width: 100%;
			height: calc(100% - 120px);
			overflow: auto;
		}
		.community-page{
			width: 100%;
			height: 60px;
			background: white;
			box-shadow: 0 0 10px 0 #eee;
			display: flex;
			justify-content: space-around;
			align-items: center;
			position: relative;
			.community-page-left{
				flex: 0.3;
				display: flex;
				justify-content: flex-start;
				position: absolute;
				left: 0;
				span{
					margin-right: 30px;
					font-size: 16px;
					letter-spacing: 1px;
				}
			}
			.community-page-right{
				flex: 1;
				display: flex;
				justify-content: center;
				
			}
		}
	}
</style>
