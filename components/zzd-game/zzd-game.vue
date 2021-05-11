<template>
	<view>
		zzd-game
		<view>
			<image class="userAvatarUrl" :src="avatar"></image>
			<text>{{current_score | formatNumber}}</text>
			<text> 城市总云值 {{count_score | formatNumber}}</text>
		</view>

		<view @click="onClickUserInfo">用户信息按钮</view>
		<view @click="onClickPrize">奖励按钮</view>
		<view @click="onClickRule">规则按钮</view>
		<view @click="onClickAllGet">一键领取按钮</view>
		<view @click="onClickSign">签到按钮</view>
		<view @click="onClickRank">排名按钮</view>
		<view @click="onClickShare">分享按钮</view>

		<view @click="onClickBuild(1)">AI智能中心</view>
		<view @click="onClickBuild(2)">5G基站</view>
		<view @click="onClickBuild(3)">大数据中心</view>
		<view @click="onClickBuild(4)">云计算中心</view>
	</view>
</template>

<script>
	export default {
		name: "zzd-game",
		data() {
			return {
				avatar: '',
				current_score: 0,
				count_score: 0,
			};
		},
		methods: {
			// 模拟页面显示的生命周期
			// 写的组件显示的生命周期
			onShowPage() {
				this.get_user_info();
			},
			get_user_info() {
				// 获取用户的信息
				this.$request({
					url: '/api/front/get_user_info',
					success: (res) => {
						switch (res.code) {
							case 200:
								let data = res.data.user;

								uni.setStorageSync('userInfo', data);
								uni.setStorageSync('buildInfo', res.data.gain);

								// 成功获取用户数据后~进行绑定显示
								this.avatar = data.avatar;
								this.current_score = data.current_score;
								this.count_score = data.count_score;

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
			showPage(name) {
				uni.$emit('showPage', {
					name: name,
					mask: false,
				});
			},
			showPop(name) {
				uni.$emit('showPage', {
					name: name,
					mask: true,
				});
			},
			onClickUserInfo() {
				this.showPop('zzd-user-info');
			},
			onClickRule() {
				this.showPop('zzd-rule');
			},
			onClickAllGet() {
				// 调用一键领取接口

				this.$request({
					url: '/api/front/execute_all',
					method: 'POST',
					success: (res) => {
						switch (res.code) {
							case 200:
								uni.showToast({
									title: '成功收取' + res.data.count_score + "云值",
									icon: "none",
								})
								break;
							default:
								uni.showToast({
									title: res.message,
									icon: "none"
								})
								break;
						}
					}
				})
			},
			onClickBuild(id) {
				uni.$emit('showPage', {
					name: 'zzd-build-info',
					mask: true,
					data: {
						id: id,
					}
				})
			},
			onClickPrize() {
				uni.showToast({
					title: "活动暂未开放",
					icon: "none"
				});

				// this.showPop('zzd-prize-list');

			},
			onClickRank() {
				this.showPage('zzd-rank');
			},
			onClickShare() {
				this.showPop('zzd-share');
			},
			onClickSign() {
				this.showPop('zzd-sign');
			},

			// 建筑升级回调 
			buildUp(param) {
				// 切换对应建筑的图片 同时执行动画
				
				// 刷新用户是数据信息
				this.get_user_info();
			},
		},
		created() {
			uni.$on('buildUp', this.buildUp);
		},
		destroyed() {
			uni.$off('buildUp', this.buildUp);
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
