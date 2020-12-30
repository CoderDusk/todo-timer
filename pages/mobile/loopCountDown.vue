<template>
	<view>
		<view class="main">
			<vac :left-time="3600000" ref="loopTimer">
			  <template v-slot:process="{ timeObj }">
			    <span class="loopTimerLeftTimeText">{{ `${timeObj.h}:${timeObj.m}:${timeObj.s}` }}</span>
			  </template>
			</vac>
			
			<u-line color="gray" length="75%" margin="30rpx auto" :hair-line="false"/>
			<view class="nextTimerInfo">
				<view class="infoBox">
					<view class="info">23</view>
					<view class="description">剩余次数</view>
				</view>
				
				<view class="infoBox">
					<view class="info">休息</view>
					<view class="description">下个步骤名称</view>
				</view>
				
				<view class="infoBox">
					<view class="info">12:12:23</view>
					<view class="description">下个步骤时长</view>
				</view>
			</view>
		</view>
		
		<view class="buttonGroup">
			<view class="button" @click="restart">
				<u-icon name="reload" size="50"></u-icon>
			</view>
			<view class="button" @click="pause" v-if="state == 'process'">
				<u-icon name="pause" size="50"></u-icon>
			</view>
			<view class="button" @click="goOn" v-else>
				<u-icon name="play-right-fill" size="50"></u-icon>
			</view>
			<view class="button" @click="goback">
				<u-icon name="close" size="50"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				time:0,
				currentTimer:{},
				timerType:'',
				singleTimerTime:0,
				loopTimerList:[],
				loopTimerCount:0,
				state:'process'
			}
		},
		methods: {
			pause(){
				this.$refs.singleTimer.pauseCountdown()
				this.state = 'paused'
			},
			restart(){
				// this.$refs.singleTimer.pauseCountdown()
				this.$refs.singleTimer.startCountdown(true)
				// console.log('restart');
			},
			goback(){
				getApp().globalData.currentTimer = {}
				uni.navigateTo({
					url:'index'
				})
			},
			goOn(){
				this.$refs.singleTimer.startCountdown()
				this.state = 'process'
			}
		},
		onLoad(){
			
			this.currentTimer = getApp().globalData.currentTimer
			
			if(this.currentTimer.type == undefined){
				uni.navigateTo({
					url:'index'
				})
			}
			
			if(this.currentTimer.type === 'singleTimer'){
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.main{
		position: absolute;
		top: 15%;
		width: 100%;
	}
	
	.buttonGroup {
		width: 100%;
		display: flex;
		justify-content: space-around;
		margin-top: 150rpx;
		bottom: 10%;
		position: absolute;
	
		.button {
			border: 1px solid #F1F1F1;
			width: 90rpx;
			height: 90rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
			color: rgb(34, 131, 246);
			box-shadow: 0 7rpx 10rpx rgba(0, 0, 0, 0.19);
		}
	}
	
	// .singleTimerLeftTimeText{
	// 	font-size: 150rpx;
	// 	width: 100%;
	// 	display: flex;
	// 	justify-content: center;
	// 	top:30%;
	// 	position: absolute;
	// }
	
	.loopTimerLeftTimeText{
		font-size: 150rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top:10%;
		
	}
	
	.nextTimerInfo{
		display: flex;
		justify-content: space-around;
		margin-top: 50rpx;
		.infoBox{
			display: flex;
			flex-direction: column;
			align-items: center;
			.info{
				font-size: 60rpx;
			}
			.description{
				font-size: 30rpx;
				color: gray;
			}
		}
	}
</style>
