<template>
	<view>
		<view class="main">
			<view class="currentTitle">
				{{currentTitle}}
			</view>

			<u-count-down :timestamp="countDownTime" style="display: none;" @change="change" @end="end" ref="countDown"></u-count-down>
			<span class="loopTimerLeftTimeText">{{showTime}}</span>

			<u-line color="gray" length="75%" margin="30rpx auto" :hair-line="false" />
			<view class="nextTimerInfo">
				<view class="infoBox">
					<view class="info">{{leftStep}}</view>
					<view class="description">剩余次数</view>
				</view>

				<view class="infoBox">
					<view class="info">{{nextTitle}}</view>
					<view class="description">下个步骤名称</view>
				</view>

				<view class="infoBox">
					<view class="info">{{nextShowTime}}</view>
					<view class="description">下个步骤时长</view>
				</view>
			</view>
		</view>

		<view class="buttonGroup">
			<view v-if="isPaused == false" class="buttonGroup">
				<view class="button" @click="restart">
					<u-icon name="reload" size="50"></u-icon>
				</view>
				<view class="button" @click="pause" >
					<u-icon name="pause" size="50"></u-icon>
				</view>
				<view class="button" @click="nextStep">
					<u-icon name="arrow-rightward" size="50"></u-icon>
				</view>
			</view>
			<view v-else class="buttonGroup">
				<view class="button" @click="goOn">
					<u-icon name="play-right-fill" size="50"></u-icon>
				</view>
				<view class="button" @click="goback">
					<u-icon name="close" size="50" color="red"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 计时器组列表
				timerList: [],
				leftStep: 0,
				tempLoopTimerGroup: {},

				// 计时器组件信息
				showTime: '',
				countDownTime: 0,

				// 当前步骤信息
				currentIndex: 0,
				currentTitle: '',

				// 下一步骤信息
				nextIndex: 0,
				nextTitle: 0,
				nextTime: 0,
				nextShowTime: 0,
				
				// 暂停功能相关变量
				isPaused:false,
				pauseTime:0,
			}
		},
		methods: {
			pause() {
				this.pauseTime = this.$refs.countDown.seconds
				this.isPaused = true
				this.countDownTime = 0
				this.ringtoneAudio.stop()
			},
			restart() {
				this.$refs.countDown.seconds  = this.timerList[this.currentIndex].time + 1
			},
			goback() {
				// this.$refs.loopTimer.stopCountdown()
				getApp().globalData.currentTimer = {}
				uni.navigateTo({
					url: 'index'
				})
			},
			goOn() {
				this.countDownTime = this.pauseTime
				this.isPaused = false
			},

			createAudio() {
				let volume = uni.getStorageSync('setting').volume;
				let ringtone = uni.getStorageSync('setting').ringtone;
				let ringtoneList = uni.getStorageSync('ringtoneList')

				this.ringtoneAudio = uni.createInnerAudioContext()
				this.ringtoneAudio.src = '../../static/ringtone/' + ringtoneList[ringtone].label + '.mp3'
				this.ringtoneAudio.volume = volume / 100
			},
			next(index) {
				if (index == this.timerList.length - 1) {
					return 0
				} else {
					return index + 1
				}
			},
			nextStep(){
				this.currentIndex = this.next(this.currentIndex)
				this.countDownTime = this.timerList[this.currentIndex].time
				this.showTime = this.mytime.secondsToString(this.countDownTime)
				this.currentTitle = this.timerList[this.currentIndex].title
				
				this.nextIndex = this.next(this.nextIndex)
				this.nextTime = this.timerList[this.nextIndex].time
				this.nextTitle = this.timerList[this.nextIndex].title
				this.nextShowTime = this.mytime.secondsToString(this.nextTime)
				
				this.leftStep--
				if(this.leftStep < 0){
					this.countDownTime = 0
					console.log('结束了')
					uni.navigateTo({
						url:'index'
					})
				}
			},
			change(countDownTime){
				this.showTime = this.mytime.secondsToString(countDownTime)
				if(countDownTime == 5){
					console.log('5秒');
					this.ringtoneAudio.play()
				}
			},
			end(){
				this.ringtoneAudio.stop()
				
				// console.log('结束了');
				this.currentIndex = this.next(this.currentIndex)
				
				// 更新当前步骤信息
				this.countDownTime = this.timerList[this.currentIndex].time
				this.showTime = this.mytime.secondsToString(this.countDownTime)
				this.currentTitle = this.timerList[this.currentIndex].title
				
				// 更新下个步骤信息
				this.nextIndex = this.next(this.nextIndex)
				this.nextTime = this.timerList[this.nextIndex].time
				this.nextTitle = this.timerList[this.nextIndex].title
				this.nextShowTime = this.mytime.secondsToString(this.nextTime)
				
				// 更新剩余步骤
				this.leftStep--
				
				if(this.leftStep < 0){
					this.countDownTime = 0
					console.log('结束了')
					uni.navigateTo({
						url:'index'
					})
				}
			}
		},
		onLoad() {

			this.tempLoopTimerGroup = uni.getStorageSync('tempLoopTimerGroup')

			this.timerList = this.tempLoopTimerGroup.timerList
			let loopCount = this.tempLoopTimerGroup.count
			
			// 剩余步骤次数 = 计时器组列表长度 * 循环次数 - 1
			this.leftStep = this.timerList.length * loopCount - 1
			
			this.createAudio()
			
			this.countDownTime = this.timerList[0].time
			this.showTime = this.mytime.secondsToString(this.countDownTime)
			this.currentTitle = this.timerList[0].title
			
			this.nextIndex = this.next(0)
			this.nextTime = this.timerList[this.nextIndex].time
			this.nextTitle = this.timerList[this.nextIndex].title
			this.nextShowTime = this.mytime.secondsToString(this.nextTime)
		}
	}
</script>

<style lang="less" scoped>
	.main {
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

	.loopTimerLeftTimeText {
		font-size: 150rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		// margin-top:10%;

	}

	.nextTimerInfo {
		display: flex;
		justify-content: space-around;
		margin-top: 50rpx;

		.infoBox {
			display: flex;
			flex-direction: column;
			align-items: center;

			.info {
				font-size: 60rpx;
			}

			.description {
				font-size: 30rpx;
				color: gray;
			}
		}
	}

	.currentTitle {
		text-align: center;
		font-size: 75rpx;
		color: gray;
	}
</style>
