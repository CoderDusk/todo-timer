<template>
	<view>


		<view class="main">
			<view class="currentTitle">
				{{currentTitle}}
			</view>

			<vac :left-time="countDownTime * 1000" ref="loopTimer" @process="onProcess" @finish="finished">
				<span class="loopTimerLeftTimeText">{{showTime}}</span>
			</vac>

			<u-line color="gray" length="75%" margin="30rpx auto" :hair-line="false" />
			<!-- <view class="nextTimerInfo">
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
			</view> -->
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
				// 计时器组列表
				timerList: [],
				leftStep: 0,
				tempLoopTimerGroup: {},

				// 计时器组件信息
				showTime: '',
				// countDownTime: 0,
				state: 'process',

				// 当前步骤信息
				currentIndex: 0,
				// currentTime: 0,
				// currentTitle: 0,

				// 下一步骤信息
				nextIndex: 0,
				nextTitle: 0,
				nextTime: 0,
				nextShowTime: 0,
			}
		},
		methods: {
			pause() {
				this.$refs.loopTimer.pauseCountdown()
				this.state = 'paused'
			},
			restart() {
				this.$refs.loopTimer.startCountdown(true)
			},
			goback() {
				this.$refs.loopTimer.stopCountdown()
				getApp().globalData.currentTimer = {}
				uni.navigateTo({
					url: 'index'
				})
			},
			goOn() {
				this.$refs.loopTimer.startCountdown()
				this.state = 'process'
			},
			updateNextStepInfo() {

				this.nextIndex = this.next(this.currentIndex)

				this.nextTitle = this.timerList[this.nextIndex].title

				this.nextTime = this.timerList[this.nextIndex].time

				this.nextShowTime = this.mytime.secondsToString(this.nextTime)
			},
			printInfo() {
				console.log('索引：' + this.currentIndex + ' ' + this.nextIndex);
				console.log('时间：' + this.countDownTime/1000 + ' ' + this.nextTime);
				console.log('标题：' + this.currentTitle + ' ' + this.nextTitle);
			},
			onProcess() {
				let leftTime = this.$refs.loopTimer.timeObj.ceil.s
				this.showTime = this.mytime.secondsToString(leftTime)
				// if(leftTime == 5){
				// 	this.ringtoneAudio.play()
				// }
				
				// this.$refs.loopTimer.runTimes = 100


				if (this.$refs.loopTimer.timeObj.ceil.s == 0) {
					console.log('0');
				}

			},
			createAudio() {
				let volume = uni.getStorageSync('setting').volume;
				let ringtone = uni.getStorageSync('setting').ringtone;
				let ringtoneList = uni.getStorageSync('ringtoneList')

				this.ringtoneAudio = uni.createInnerAudioContext()
				this.ringtoneAudio.src = '../../static/ringtone/' + ringtoneList[ringtone].label + '.mp3'
				this.ringtoneAudio.volume = volume / 100
			},
			updateCurrentInfo() {
				this.countDownTime = this.timerList[this.currentIndex].time*1000
				this.$refs.loopTimer.startCountdown(true)
				this.currentTitle = this.timerList[this.currentIndex].title
			},
			finished() {
				// this.ringtoneAudio.stop()
				
				// console.log('进入finish:' + this.currentIndex)
				// console.log('进入finish:' + this.countDownTime)
				this.currentIndex = this.next(this.currentIndex)
				// this.currentTitle = this.timerList[this.currentIndex].title
				// this.countDownTime = this.timerList[this.currentIndex].time
				this.$refs.loopTimer.startCountdown(true)
				
				// console.log('完成finish:' + this.countDownTime)
				// console.log(this.countDownTime)
				// this.currentIndex = this.next(this.currentIndex)

				// this.updateCurrentInfo()
				
				// this.currentTitle = this.timerList[this.currentIndex].title
				// this.countDownTime = this.timerList[this.currentIndex].time*1000
				
				// this.$refs.loopTimer.startCountdown(true)

				// this.updateNextStepInfo()
				
				// this.leftStep--

				// if (this.leftStep < 0) {
				// 	this.$refs.loopTimer.stopCountdown()
				// 	this.goback()
				// }
			},
			next(index) {
				if (index == this.timerList.length - 1) {
					return 0
				} else {
					return index + 1
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

			// this.countDownTime = this.timerList[0].time
			// this.currentTitle = this.timerList[0].title

			// 剩余步骤次数 = 计时器组列表长度 * 循环次数 - 1
			this.leftStep = this.timerList.length * loopCount - 1

			// this.currentTitle = this.timerList[this.currentIndex].title
			// this.updateCurrentInfo()

			// this.nextIndex = this.next(0)
			// this.updateNextStepInfo()
		},

		computed: {
			// 计时器组件的剩余时间
			countDownTime:function(){
				return this.timerList[this.currentIndex].time
			},
			// 下个步骤的索引号
			// nextIndex: function() {
			// 	if (this.currentIndex == this.timerList.length - 1) {
			// 		return 0
			// 	} else {
			// 		return this.currentIndex + 1
			// 	}
			// },
			// 下个计时器的标题
			// nextTitle: function() {
			// 	return this.timerList[this.nextIndex].title
			// },
			// // 下个计时器的时间
			// nextTime: function() {
			// 	return this.timerList[this.nextIndex].time
			// },
			// // 下个计时器时间的字符串
			// nextShowTime: function() {
			// 	return this.mytime.secondsToString(this.nextTime)
			// 	// return this.timerList[this.nextIndex].showtime
			// },
			// 当前计时器的标题
			currentTitle: function() {
				return this.timerList[this.currentIndex].title
			},

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

	// .singleTimerLeftTimeText{
	// 	font-size: 150rpx;
	// 	width: 100%;
	// 	display: flex;
	// 	justify-content: center;
	// 	top:30%;
	// 	position: absolute;
	// }

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
