<template>
	<view class="common_bg pop_bg">
		<zzd-loading v-if="getState('loading')" ref="zzd-loading"></zzd-loading>
		<zzd-login v-if="getState('login')" ref="zzd-login"></zzd-login>

		<zzd-game v-show="getState('game')" ref="zzd-game"></zzd-game>

		<zzd-poster v-show="getState('poster')" ref="zzd-poster"></zzd-poster>
		<zzd-rank v-show="getState('rank')" ref="zzd-rank"></zzd-rank>

		<view class="pop_bg_mask pop_bg" v-show="getPopState"></view>

		<view class="pop_wrap pop_bg">
			<zzd-build-info v-show="getState('build-info')" :itemData="getItemData('build-info')" ref="zzd-build-info">
			</zzd-build-info>
			<zzd-prize-list v-show="getState('prize-list')" ref="zzd-prize-list"></zzd-prize-list>
			<zzd-prize-info v-if="getState('prize-info')" ref="zzd-prize-info"></zzd-prize-info>
			<zzd-sign v-show="getState('sign')" ref="zzd-sign"></zzd-sign>
			<zzd-share v-show="getState('share')" ref="zzd-share"></zzd-share>
			<zzd-rule v-show="getState('rule')" ref="zzd-rule"></zzd-rule>
			<zzd-user-info v-show="getState('user-info')" ref="zzd-user-info"></zzd-user-info>
			<zzd-sign-success v-if="getState('sign-success')" ref="zzd-sign-success"></zzd-sign-success>
		</view>

	</view>
</template>

<script>
	export default {
		name: "zzd-main",
		data() {
			return {
				// 保存当前显示页面对象的数据
				showList: [{
					name: 'zzd-loading',
					mask: false,
				}],
			};
		},
		methods: {
			getState(name) {
				name = 'zzd-' + name;

				let isShow = false;
				// 这个是查询当前name对象是否存在
				isShow = this.showList.some(obj => obj.name == name);
				return isShow;
			},
			// 显示页面
			showPage(page) {
				// showList判断页面是否已经显示
				if (!this.showList.some(obj => obj.name == page.name)) {
					// 当页面对象不存在时,才添加
					this.showList.push(page);

					// 调用对应页面组件的显示方法
					this.$refs[page.name] &&
						this.$refs[page.name].onShowPage &&
						this.$refs[page.name].onShowPage();
				}
			},
			// 隐藏页面
			hidePage(page) {
				if (this.showList.some(obj => obj.name == page.name)) {
					this.showList.splice(this.showList.findIndex(obj => obj.name == page.name), 1);
				}
			},
			// 重定向页面
			redirectPage(page) {
				this.showList = [];
				this.showPage(page);
			},
			// 获取组件的参数
			getItemData(name) {
				name = 'zzd-' + name;
				let itemData = {};

				// 判断页面是否显示
				if (this.showList.some(obj => obj.name == name)) {
					// 先找到对应页面的对象
					let page = this.showList.find(obj => obj.name == name);
					// 再从对象中获取传递过来的参数
					itemData = page.data || {};
				}

				return itemData;
			}
		},
		created() {
			uni.$on('showPage', this.showPage);
			uni.$on('hidePage', this.hidePage);
			uni.$on('redirectPage', this.redirectPage);
		},
		destroyed() {
			uni.$off('showPage', this.showPage);
			uni.$off('hidePage', this.hidePage);
			uni.$off('redirectPage', this.redirectPage);
		},
		computed: {
			// 获取弹窗蒙层的状态
			getPopState() {
				let isShow = false;

				isShow = this.showList.some(obj => obj.mask);

				return isShow;
			}
		}
	}
</script>

<style lang="less">
	.common_bg {
		background: -webkit-linear-gradient(top, #0496FF, #A078FF);
	}

	.pop_bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.pop_bg_mask {
		background-color: rgba(0, 0, 0, 0.75);
		background: -webkit-linear-gradient(top, #0496FF, #A078FF);
	}

	.pop_wrap {
		display: flex;
		justify-content: center;
		align-items: center;

		pointer-events: none;

		view {
			pointer-events: auto;
		}
	}
</style>

<style>

</style>
