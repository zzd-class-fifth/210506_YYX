<template>
	<view>
		zzd-loading
	</view>
</template>

<script>
	export default {
		name: "zzd-loading",
		data() {
			return {

			};
		},
		mounted() {
			setTimeout(() => {
				uni.$emit('showPage', {
					name: 'zzd-login'
				});
				
				uni.$emit('hidePage', {
					name: "zzd-loading"
				})
			}, 3000);
		}
	}
</script>

<style lang="less">

</style>
