<template>
	<div class="web-team">
		<el-container>
		  <el-header @click.native="communityClick" class="hoverActive">
			  欢迎来到我们的世界，这也将是您的世界
		  </el-header>
		  <el-main>
			  <el-container>
				<el-aside>
					<personalDetails></personalDetails>
				</el-aside>
				<el-main>
					<router-view />
				</el-main>
			  </el-container>
		  </el-main>
		<!--  <el-footer>
			  
		  </el-footer> -->
		</el-container>
	</div>
</template>

<script lang="ts">
	
	import { ref,provide,watch } from 'vue'
	import { useRouter } from 'vue-router'
	import personalDetails from './children/personalDetails.vue'
	export default {
		components:{
			personalDetails
		},
		setup(){
			const router = useRouter();
			const communityClick = ()=>{
				router.push('/community')
			}
			return {
				communityClick
			}
		}
		
	}
	
</script>

<style lang="scss">
	.web-team{
		width: 100%;
		height: 100%;
		display: flex;
		.el-container{
			.el-header{
				text-align: center;
				line-height: 48px;
				font-size: 20px;
				box-shadow: 0 0 10px 0 #aaa;
			}
			.el-main{
				display: flex;
				padding: 0px;
				.el-container{
					.el-aside{
						width: 200PX;
						box-shadow: 0 0 10px 0 #aaa;
					}
					.el-main{
						padding: 20px 20px 0 20px;
						box-sizing: border-box;
					}
				}
			}
			.el-footer{
				box-shadow: 0 0 10px 0 #aaa;
			}
		}
		
		
	}
</style>
