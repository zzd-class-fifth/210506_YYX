<template>
	<view class="zzd-build-info">
		<image src="../../static/img/blue_maskBg.png" class="img_mask_bg"></image>
		<view class="content_box">

			<text>{{level > 0 ? '升级建筑' :'解锁建筑'}}</text>

			<text space="ensp">消耗 {{ upMoney[level] }} 云值</text>

			<image :src="buildImageSrc" class="build_icon" mode="widthFix"></image>

			<view class="star_box">
				<view v-for="(item,index) in starList" :key="index">
					<view v-show="level > index">
						<image src="../../static/img/up_mask_1.png"></image>
					</view>
				</view>
			</view>

			<view class="level_box">
				<view class="level">
					<text>{{level}}级</text>
				</view>

				<text>{{buildTestName[itemData.id]}}</text>
			</view>

			<text>云计算中心收入增加20%</text>
			<text>收入: {{level}}云值 / 秒</text>

			<zzd-button @click="execute_upgrade">
				建 造
			</zzd-button>
		</view>
		<zzd-button-close pageName="zzd-build-info" class="button_close"></zzd-button-close>
	</view>
</template>

<script>
	export default {
		name: "zzd-build-info",
		props: {
			itemData: {
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				starList: [{}, {}, {}, {}, {}], //星星的个数
				level: 0, //当前建筑的当前等级
				upMoney: [5000, 10000, 25000, 40000, 70000], //保存每次升级时所需要消耗的费用
				//这里保存建筑id对应的建筑图片名称前缀
				buildName: ['', 'ai', 'b5g', 'big_data_center', 'no'],
				// 这里保存的是建筑id对应的建筑中文名称
				buildTestName: ['', 'Al智能中心', '5G基站', '大数据中心', '云计算中心'],
			};
		},
		methods: {
			// 升级建筑的方法
			execute_upgrade() {
				this.$request({
					url: '/api/front/execute_upgrade',
					method: 'POST',
					data: {
						timestamp: new Date().getTime(),
						type: uni.getStorageSync('buildInfo').digital[Number(this.itemData.id) - 1].type,
					},
					success: (res) => {
						switch (res.code) {
							case 200:
								// 关闭当前建筑信息弹窗
								uni.$emit('hidePage', {
									name: "zzd-build-info"
								});

								// 通知游戏页面建筑升级成功
								uni.$emit('buildUp', {
									id: Number(this.itemData.id)
								});
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
			}
		},
		created() {

		},
		computed: {
			// 这里返回建筑图片地址的信息
			buildImageSrc() {
				// 这里获取建筑的id信息
				let id = this.itemData.id;
				if (id) {
					// 默认图片的绝对前缀地址
					let imgSrc = '../../static/img/build/';
					// 这里获取到所有建筑的数据信息
					let gain = uni.getStorageSync('buildInfo');
					// 获取当前建筑的等级
					let level = gain.digital[Number(id) - 1].grade;
					// 保存当前建筑的等级
					this.level = Number(level);

					imgSrc += this.buildName[id] + level + '.png';

					return imgSrc;
				}
			}
		}
	}
</script>

<style lang="less">
	view {
		color: #FFFFFF;
	}

	.zzd-build-info {
		position: relative;
	}

	.img_mask_bg {
		width: 616rpx;
		height: 956rpx;
	}

	.content_box {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
	}

	.build_icon {
		width: 269rpx;
	}

	.star_box {
		width: 195rpx;
		height: 32rpx;
		display: flex;

		image {
			width: 33rpx;
			height: 32rpx;

			margin: 0 5rpx;
		}
	}

	.button_close {
		position: absolute;
		top: 0;
		right: 0;
	}
</style>
