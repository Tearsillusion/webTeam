<template>
	<el-card v-for="item in data" class="hoverClass list">
		<img :src="item.image_path?item.image_path:require('../assets/image/icon-defalut.png')" class="image"
			@error="(e)=>{e.target.src = require('../assets/image/icon-defalut.png')}" @click="communityClick(item)" />
		<div class="el-card-info">
			<div class="el-card-info-avatar">
				<div class="el-card-info-avatar-title" @click="communityClick(item)">
					<img :src="item.avatar">
					<strong>{{item.title}}</strong>
				</div>
				<span v-if="deleteShow" class="hoverActive" @click="deleteClick(item.id)">删除</span>
			</div>
			<div class="bottom" @click="communityClick(item)">
				<p>{{ item.content }}</p>
			</div>
		</div>
	</el-card>
</template>

<script lang="ts" setup>
	import {
		ref
	} from 'vue'
	import {
		useRouter
	} from 'vue-router'
	const router = useRouter();
	const emits = defineEmits(['delete'])

	const props = defineProps({
		data: Array,
		deleteShow: Boolean
	})
	const communityClick = (item) => {
		router.push({
			path: '/communityDetail',
			query: {
				id: item.id
			}
		})
	}
	const deleteClick = (id) => {
		emits("delete", id)
	}
</script>

<style lang="scss">
	.list {
		width: 260px;
		height: 260px;
		cursor: pointer;
		display: inline-block;
		margin-right: 30px;
		margin-bottom: 20px;

		.el-card__body {
			width: 100%;
			height: 100%;
			padding: 0;

			img {
				width: 100%;
				height: 120px;
				object-fit: cover;
			}

			.el-card-info {
				padding: 10px;
				box-sizing: border-box;

				.el-card-info-avatar {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.el-card-info-avatar-title {
						width: calc(100% - 40px);
						display: flex;
						justify-content: flex-start;
						align-items: center;

						img {
							width: 30px;
							height: 30px;
							border-radius: 60%;
							margin-right: 5px;
						}

						strong {
							font-size: 18px;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}

					span {
						width: 40px;
						height: 25px;
						background: #409eff;
						color: white;
						text-align: center;
						line-height: 25px;
						border-radius: 20px;
						float: right;
						font-size: 12px;
					}
				}

				span {
					font-size: 12px;
					opacity: 0.5;
				}

				p {
					font-size: 13px;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
					overflow: hidden;
					letter-spacing: 1px;
				}
			}
		}
	}
</style>
