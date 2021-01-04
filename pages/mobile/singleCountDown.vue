<template>
	<view>
		<vac :left-time="currentTimer.time*1000" ref="singleTimer" @process="onProcess" @finish="finished">
		  <!-- <template v-slot:process="{ timeObj }">
		    <span class="singleTimerLeftTimeText">{{ `${timeObj.h}:${timeObj.m}:${timeObj.s}` }}</span>
		  </template> -->
		  <view class="singleTimerLeftTimeText">{{showTime}}</view>
		</vac>
		
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
				state:'process',
				// ringtone:null,
				ringtoneAudio:null,
				// ringtoneList:null,
				volume:null,
				showTime:''
			};
		},
		methods:{
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
				this.$refs.singleTimer.stopCountdown()
				this.ringtoneAudio.stop()
				uni.navigateTo({
					url:'index'
				})
			},
			goOn(){
				this.$refs.singleTimer.startCountdown()
				this.state = 'process'
			},
			onProcess(){
				let leftTime = this.$refs.singleTimer.timeObj.ceil.s
				this.showTime = this.mytime.secondsToString(leftTime)
				if(leftTime == 5){
					this.ringtoneAudio.play()
				}
				
			},
			finished(){
				this.ringtoneAudio.stop()
				this.goback()
			}
			
		},
		onLoad(){
			
			this.currentTimer = getApp().globalData.currentTimer
			
			if(this.currentTimer.type == undefined){
				uni.navigateTo({
					url:'index'
				})
			}
			
			let volume = uni.getStorageSync('setting').volume;
			let ringtone = uni.getStorageSync('setting').ringtone;
			let ringtoneList = uni.getStorageSync('ringtoneList')
			
			this.ringtoneAudio = uni.createInnerAudioContext()
			this.ringtoneAudio.src = '../../static/ringtone/' + ringtoneList[ringtone].label + '.mp3'
			this.ringtoneAudio.volume = volume/100
			
			
			
		}
	}
</script>

<style lang="less" scoped>
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
	
	.singleTimerLeftTimeText{
		font-size: 150rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		top:30%;
		position: absolute;
	}
</style>
