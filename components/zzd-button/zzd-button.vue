<template>
	<view class="zzd-button" @click="onClick">
		<image src="../../static/img/common_button_bg_yellow.png" class="common_button_bg_yellow" mode="widthFix">
		</image>
		<view class="test_box">
			<text class="text_content">
				<!-- 匿名插槽 -->
				<slot></slot>
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			onClick() {
				this.$emit('click');
			}
		}
	}
</script>

<style lang="less">
	.zzd-button {
		position: relative;

		image,
		view,
		text {
			pointer-events: none;
		}

		.common_button_bg_yellow {
			width: 287rpx;
		}

		.test_box {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 20rpx;

			display: flex;
			justify-content: center;
			align-items: center;

			.text_content {
				color: #0857d2;
				font-size: 40rpx;
			}
		}
	}
</style>
