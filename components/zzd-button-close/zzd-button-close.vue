<template>
	<view @click="onClickClose" class="zzd-button-close">
		关闭页面
	</view>
</template>

<script>
	export default {
		name: "zzd-button-close",
		data() {
			return {

			};
		},
		props: ['pageName'],
		methods: {
			onClickClose() {
				if (this.pageName) {
					uni.$emit('hidePage', {
						name: this.pageName
					})
				}
			}
		}
	}
</script>

<style lang="less">
	.zzd-button-close {
		pointer-events: auto;
		color: #FFFFFF;
	}
</style>