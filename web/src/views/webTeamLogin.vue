<template>
	<div class="web-team-login">
		<div class="web-team-login-left">
			<video id="myVideo" muted="muted" autoplay="autoplay" loop="loop" preload src="../assets/audio/login.mp4"></video>
		</div>
		<router-view />
	</div>
</template>

<script lang="ts" setup>
	
</script>

<style lang="scss">
	.web-team-login{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		.web-team-login-left{
			width: 50%;
			height: 100%;
			
			video{
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
		
	}
</style>
