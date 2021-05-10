<template>
	<view>
		zzd-login

		<view class="userAvatarUrl">
			<open-data type="userAvatarUrl"></open-data>
		</view>
		<open-data type="userNickName"></open-data>

		<view>
			<text>选择您的区域</text>
			<picker :range="proRange" :range-key="proRangeKey" @change="onChangePro">
				{{proRange[proValue].name}}
			</picker>
		</view>

		<view>
			<text>所在城市</text>
			<picker :range="cityRange" range-key="name" @change="onChangeCity">
				{{cityRange[cityValue].name}}
			</picker>
		</view>

		<view @click="onClickLogin">登录按钮</view>
	</view>
</template>

<script>
	export default {
		name: "zzd-login",
		data() {
			return {
				avatarUrl: '',
				nickName: '',

				proRange: [],
				proRangeKey: 'name',
				proValue: 0,

				cityRange: [],
				cityValue: 0,
			};
		},
		created() {
			// this.getUserInfo();
			// this.getUserProfile();
			this.get_province();
		},
		methods: {
			onClickLogin() {
				// 调用微信的登录接口时,会有一定的延迟或者卡顿
				// 为了用户良好的体验和,和不重复点击登录按钮
				// 所以显示一个全屏的蒙层
				uni.showLoading({
					mask: true,
				})

				// 检测用户是否选择省份和城市
				// 因为设置了默认值,所有省份默认为北京 海定区

				// 获取用户微信头像和昵称
				this.getUserProfile();

				// 获取微信登录码

				// 获取用户分享id

				// 注册小程序登录

				// 登录成功后,跳转游戏页面				
			},
			// 获取用户信息
			getUserInfo() {
				uni.getUserInfo({
					provider: 'weixin',
					success: (res) => {
						let info = res.userInfo;
						this.avatarUrl = info.avatarUrl;
						this.nickName = info.nickName;
					}
				})
			},
			// 获取用户信息
			getUserProfile() {
				uni.getUserProfile({
					desc: '用于游戏展示',
					success: (res) => {
						console.log(res);
						let info = res.userInfo;
						this.avatarUrl = info.avatarUrl;
						this.nickName = info.nickName;

						this.getCode();
					},
					fail: (err) => {
						console.log(err);
					}
				})
			},
			// 获取微信登录码
			getCode() {
				uni.login({
					success: (res) => {
						if (res.code) {
							this.authorization(res.code);
						}
					}
				})
			},
			// 注册小程序事件的接口
			authorization(code) {
				this.$request({
					url: '/api/open/authorization',
					data: {
						code,
						nickname: this.nickName,
						avatar: this.avatarUrl,
						province_id: this.proRange[this.proValue].id,
						city_id: this.cityRange[this.cityValue].id,
						share_id: ''
					},
					method: "POST",
					success: (res) => {
						switch (res.code) {
							case 200:
								// 注册成功后

								// 保存用户登录的唯一标识
								uni.setStorageSync('authorization', res.data.authorization);
								
								// 跳转到游戏页
								uni.$emit('redirectPage', {
									name: 'zzd-game'
								})
								
								// 隐藏加载蒙层
								uni.hideLoading();
								break;
							default:
								uni.showToast({
									title: res.message,
									icon: "none",
								})
								break;
						}
					}
				})
			},
			// 获取省信息
			get_province() {
				this.$request({
					url: '/api/open/get_province',
					success: (res) => {
						switch (res.code) {
							case 200:
								this.proRange = res.data;

								this.get_city(this.proRange[this.proValue].id);
								break;
							default:
								uni.showToast({
									title: res.message,
									icon: "none",
								})
								break;
						}
					}
				})
			},
			onChangePro(e) {
				this.proValue = e.detail.value;

				this.get_city(this.proRange[this.proValue].id);
			},
			get_city(id) {
				// 为了数据不出错,保险起见自己手动归零
				this.cityValue = 0;

				this.$request({
					url: '/api/open/get_city',
					data: {
						province_id: id
					},
					method: "POST",
					success: (res) => {
						switch (res.code) {
							case 200:
								this.cityRange = res.data;
								break;
							default:
								uni.showToast({
									title: res.message,
									icon: "none",
								})
								break;
						}
					}
				})
			},
			onChangeCity(e) {
				this.cityValue = e.detail.value;
			}
		}
	}
</script>

<style lang="less">
	.userAvatarUrl {
		width: 292rpx;
		height: 292rpx;
		border-radius: 100%;
		overflow: hidden;
	}
</style>
