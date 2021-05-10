<template>
	<view>
		zzd-loading
	</view>
</template>

<script>
	export default {
		name: "zzd-loading",
		data() {
			return {

			};
		},
		mounted() {
			this.getCode();
		},
		methods: {
			// 跳转到登录页
			gotoLogin() {
				uni.$emit('redirectPage', {
					name: 'zzd-login'
				})
			},
			// 跳转到游戏页面
			gotoGame() {
				uni.$emit('redirectPage', {
					name: 'zzd-game'
				})
			},
			// 检测用户是否登录的结果
			checkAuthorization(res) {
				switch (res.code) {
					case 200:
						// 已经登录过
						
						// 先保存一下用户的唯一表示
						uni.setStorageSync('authorization', res.data.authorization);
						
						// 然后再跳转到游戏页面
						this.gotoGame();
						break;
					default:
						// 其他情况全部默认为登录
						this.gotoLogin();
						break;
				}
			},
			// 检测用户是否登录接口
			is_authorization(code) {
				this.$request({
					url: '/api/open/is_authorization',
					data: {
						code
					},
					method: "POST",
					success: this.checkAuthorization,
				})
			},
			// 获取微信登录码
			getCode() {
				uni.login({
					success: (res) => {
						if (res.code) {
							this.is_authorization(res.code);
						}
					}
				})
			}
		}
	}
</script>

<style lang="less">

</style>
