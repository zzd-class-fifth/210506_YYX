<template>
	<view>
		zzd-login
		<view @click="onClickLogin">登录按钮</view>
	</view>
</template>

<script>
	export default {
		name: "zzd-login",
		data() {
			return {

			};
		},
		methods: {
			onClickLogin() {

				uni.$emit('redirectPage', {
					name: 'zzd-game'
				})
			}
		}
	}
</script>

<style lang="less">

</style>
