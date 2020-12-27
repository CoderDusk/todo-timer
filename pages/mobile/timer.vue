<template>
	<view>
		<!-- <vac :end-time="100">
		  <template
		    v-slot:process="{ timeObj }">
		    <span>{{ ` ${timeObj.m}:${timeObj.s}` }}</span>
		  </template>
		</vac> -->
		<!-- {{currentTimer}} -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				time:0,
			};
		},
		onLoad(){
			// this.time = new Date().getTime() + getApp().globalData.singleTimer*1000
			if(getApp().globalData.currentTimer.type == undefined){
				// console.log('没有计时器');
				uni.navigateTo({
					url:'index'
				})
			}
		}
	}
</script>

<style lang="less">

</style>
