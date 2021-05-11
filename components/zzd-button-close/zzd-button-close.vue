<template>
	<view @click="onClickClose" class="zzd-button-close">
		<image src="../../static/img/close.png" class="img_close"></image>
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

	.img_close {
		width: 89rpx;
		height: 89rpx;
	}
</style>
