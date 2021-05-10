<template>
	<view>
		zzd-user-info
		<zzd-button-close pageName="zzd-user-info"></zzd-button-close>

		<image :src="avatarUrl"></image>
		<text>{{nickName}}</text>
		<text>{{province_name}} - {{city_name}}</text>
		<text>{{current_score | formatNumber}}</text>
		<text>{{count_score | formatNumber}}</text>
		
		<view>
			<text>音乐</text>
			<zzd-switch></zzd-switch>
		</view>
		
		<view>
			<text>音效</text>
			<zzd-switch></zzd-switch>
		</view>
		
	</view>
</template>

<script>
	export default {
		name: "zzd-user-info",
		data() {
			return {
				avatarUrl: '',
				nickName: '',
				current_score: 0,
				count_score: 0,
				"province_name": "",
				"city_name": ""
			}
		},
		methods: {
			onShowPage() {
				let userInfo = uni.getStorageSync('userInfo');

				this.avatarUrl = userInfo.avatar;
				this.nickName = userInfo.nickname;
				this.province_name = userInfo.province_name;
				this.city_name = userInfo.city_name;
				this.current_score = userInfo.current_score;
				this.count_score = userInfo.count_score;

			},
		}
	}
</script>

<style lang="less">

</style>
