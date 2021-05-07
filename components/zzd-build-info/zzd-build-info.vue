<template>
	<view>
		zzd-build-info
		{{itemData.id}}
		<zzd-button-close pageName="zzd-build-info"></zzd-button-close>
	</view>
</template>

<script>
	export default {
		name: "zzd-build-info",
		props: {
			itemData: {
				default: () => {
					return {}
				},
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="less">
	view {
		color: #FFFFFF;
	}
</style>
