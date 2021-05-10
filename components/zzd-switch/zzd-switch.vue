<template>
	<view class="zzd-switch" @click="onClick">
		<view class="switch_bg"></view>

		<view class="msg_box">
			<text class="open" v-show="active">开启</text>
			<text class="close" v-show="!active">关闭</text>
		</view>

		<view class="switch_dot_box" :class="{active:active}">
			<view class="switch_dot_bg"></view>
			<view class="switch_dot"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "zzd-switch",
		props: {
			// 初始状态由父组件决定
			// 如果父组件没有设定,那么我们默认为 false
			isActive: {
				default: false,
			},
		},
		data() {
			return {
				// 这个active是给自己用的
				active: false,
			};
		},
		created() {
			this.active = this.isActive;
		},
		methods: {
			onClick() {
				this.active = !this.active;
				this.$emit("update:isActive", this.active);
			}
		}
	}
</script>

<style lang="less">
	.zzd-switch {
		display: inline-block;
		position: relative;
		width: 136rpx;
		height: 50rpx;

		.switch_bg {
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.75);
			border-radius: 25rpx;
		}

		.msg_box {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;

			.close,
			.open {
				position: absolute;
				font-size: 30rpx;
				line-height: 50rpx;
			}

			.open {
				left: 20rpx;
			}

			.close {
				right: 20rpx;
			}
		}

		.switch_dot_box {
			position: absolute;
			top: 5rpx;
			left: 5rpx;

			overflow: hidden;
			border-radius: 100%;
			width: 40rpx;
			height: 40rpx;

			display: flex;
			justify-content: center;
			align-items: center;

			transition: all .2s linear;

			&.active {
				transform: translateX(85rpx);
			}

			.switch_dot_bg {
				position: absolute;
				top: 0;
				left: 0;

				width: 100%;
				height: 100%;
				background: linear-gradient(top, #63adff, #958bfd);
			}

			.switch_dot {
				position: relative;

				width: 70%;
				height: 70%;

				border-radius: 100%;
				background: linear-gradient(top, #3c94ff, #7e81ff);
			}
		}
	}
</style>
