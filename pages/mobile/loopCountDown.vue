<template>
	<!-- 循环计时器页面 -->
	<view>
		<view class="main">
			<!-- 倒计时组件，页面不可见 -->
			<u-count-down :timestamp="countDownTime" style="display: none;" @change="change" @end="end" ref="countDown"></u-count-down>
			
			<!-- 当前步骤的标题 -->
			<view class="currentTitle">
				{{currentTitle}}
			</view>
			
			<!-- 当前计时器剩余时间显示在页面上的字符串 -->
			<span class="loopTimerLeftTimeText">{{showTime}}</span>

			<!-- 辅助线 -->
			<u-line color="gray" length="75%" margin="30rpx auto" :hair-line="false" />
			
			<!-- 下一步骤的信息 -->
			<view class="nextTimerInfo">
				<!-- 剩余次数 -->
				<view class="infoBox">
					<view class="info">{{leftStep}}</view>
					<view class="description">剩余次数</view>
				</view>

				<!-- 下个步骤的名称 -->
				<view class="infoBox">
					<view class="info">{{nextTitle}}</view>
					<view class="description">下个步骤名称</view>
				</view>

				<!-- 下个步骤的时长 -->
				<view class="infoBox">
					<view class="info">{{nextShowTime}}</view>
					<view class="description">下个步骤时长</view>
				</view>
			</view>
		</view>

		<!-- 底部按钮组 -->
		<view class="buttonGroup">
			<!-- 倒计时进行时显示的按钮： 重启、暂停、下个步骤 -->
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
			<!-- 倒计时暂停时显示的按钮：继续、退出返回 -->
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
			// 创建铃声音频对象
			createAudio() {
				let volume = uni.getStorageSync('setting').volume;
				let ringtone = uni.getStorageSync('setting').ringtone;
				let ringtoneList = uni.getStorageSync('ringtoneList')
			
				this.ringtoneAudio = uni.createInnerAudioContext()
				this.ringtoneAudio.src = '../../static/ringtone/' + ringtoneList[ringtone].label + '.mp3'
				this.ringtoneAudio.volume = volume / 100
			},
			// 下个索引号
			next(index) {
				if (index == this.timerList.length - 1) {
					return 0
				} else {
					return index + 1
				}
			},
			// 更新当前步骤信息
			updateCurrentInfo(){
				this.countDownTime = this.timerList[this.currentIndex].time
				this.showTime = this.mytime.secondsToString(this.countDownTime)
				this.currentTitle = this.timerList[this.currentIndex].title
			},
			// 更新下个步骤信息
			updateNextInfo(){
				this.nextIndex = this.next(this.nextIndex)
				this.nextTime = this.timerList[this.nextIndex].time
				this.nextTitle = this.timerList[this.nextIndex].title
				this.nextShowTime = this.mytime.secondsToString(this.nextTime)
			},
			updateLeftStep(){
				this.leftStep--
				
				if(this.leftStep < 0){
					this.countDownTime = 0
					uni.navigateTo({
						url:'index'
					})
				}
			},
			// 暂停
			pause() {
				// 把计时器当前剩余时间保存到暂停时间变量中
				this.pauseTime = this.$refs.countDown.seconds
				// 暂停状态变量设置为暂停
				this.isPaused = true
				// 计时器组件时间设置为0,即停止计时器
				this.countDownTime = 0
				// 停止铃声
				this.ringtoneAudio.stop()
			},
			// 继续
			goOn() {
				this.countDownTime = this.pauseTime
				this.isPaused = false
			},
			// 重启
			restart() {
				this.$refs.countDown.seconds  = this.timerList[this.currentIndex].time + 1
			},
			// 退出返回首页
			goback() {
				uni.navigateTo({
					url: 'index'
				})
			},
			// 跳转到下一步骤
			nextStep(){
				// 索引号 + 1
				this.currentIndex = this.next(this.currentIndex)
				// 更新当前步骤信息
				this.updateCurrentInfo()
				// 更新下个步骤信息
				this.updateNextInfo()
				// 更新剩余步骤
				this.updateLeftStep()
			},
			// 计时器进行时触发的函数
			change(countDownTime){
				// 更新界面上显示的剩余时间
				this.showTime = this.mytime.secondsToString(countDownTime)
				// 剩余时间为5秒的时候播放铃声
				if(countDownTime == 5){
					console.log('5秒');
					this.ringtoneAudio.play()
				}
			},
			// 计时器停止时触发的函数
			end(){
				// 停止铃声
				this.ringtoneAudio.stop()
				// 当前索引号 + 1
				this.currentIndex = this.next(this.currentIndex)				
				// 更新当前步骤信息
				this.updateCurrentInfo()				
				// 更新下个步骤信息
				this.updateNextInfo()				
				// 更新剩余步骤
				this.updateLeftStep()
			}
		},
		onLoad() {
			// 从本地存储中读取计时器列表和循环次数
			this.tempLoopTimerGroup = uni.getStorageSync('tempLoopTimerGroup')
			this.timerList = this.tempLoopTimerGroup.timerList
			let loopCount = this.tempLoopTimerGroup.count
			
			// 如果计时器列表为空或者循环次数为空,就跳转回首页
			if(this.timerList.length == 0 && loopCount == 0){
				uni.navigateTo({
					url:'index'
				})
			}
			
			// 剩余步骤次数 = 计时器组列表长度 * 循环次数 - 1
			this.leftStep = this.timerList.length * loopCount - 1
			// 创建铃声音频对象
			this.createAudio()
			// 更新当前步骤信息
			this.updateCurrentInfo()
			// 更新下个步骤信息
			this.updateNextInfo()
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
