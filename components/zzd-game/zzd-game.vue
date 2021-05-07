<template>
	<view>
		zzd-game
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

			};
		},
		methods: {
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
				// todo
				// 调用一键领取接口
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
				this.showPop('zzd-prize-list');
			},
			onClickRank() {
				this.showPage('zzd-rank');
			},
			onClickShare() {
				this.showPop('zzd-share');
			},
			onClickSign(){
				this.showPop('zzd-sign');
			},
		}
	}
</script>

<style lang="less">

</style>
