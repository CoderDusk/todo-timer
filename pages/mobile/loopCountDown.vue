<template>
	<!-- 循环计时器页面 -->
	<view class="main">
		<view></view>
		<view class="panel">
			<!-- 倒计时组件，页面不可见 -->
			<u-count-down :timestamp="countDownTime" style="display: none;" @change="change" @end="end" ref="countDown">
			</u-count-down>

			<!-- 当前步骤的标题 -->
			<view class="currentTitle">
				{{currentStep.title}}
			</view>

			<!-- 当前计时器剩余时间显示在页面上的字符串 -->
			<span class="loopTimerLeftTimeText">{{currentStep.leftTime}}</span>

			<!-- 辅助线 -->
			<u-line color="gray" length="75%" margin="30rpx auto" :hair-line="false" />

			<!-- 下一步骤的信息 -->
			<view class="nextTimerInfo">
				<!-- 剩余次数 -->
				<view class="infoBox">
					<view class="info">{{currentStep.leftStep}}</view>
					<view class="description">剩余步骤</view>
				</view>

				<!-- 下个步骤的名称 -->
				<view class="infoBox">
					<view class="info">{{nextStep.title}}</view>
					<view class="description">下个步骤名称</view>
				</view>

				<!-- 下个步骤的时长 -->
				<view class="infoBox">
					<view class="info">{{nextStep.time}}</view>
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
				<view class="button" @click="pause">
					<u-icon name="pause" size="50"></u-icon>
				</view>
				<view class="button" @click="goNextStep">
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

				// 计时器组件信息
				countDownTime: 0,

				// 当前步骤信息
				currentStep: {
					index: 0,
					leftTime: 0,
					title: '',
					leftStep: 0,
				},

				// 下一步骤信息
				nextStep: {
					index: 0,
					title: 0,
					time: 0
				},

				// 暂停功能相关变量
				isPaused: false,
				pauseTime: 0,
			}
		},
		methods: {
			// 下个索引号
			next(index) {
				if (index == this.timerList.length - 1) {
					return 0
				} else {
					return index + 1
				}
			},
			// 更新当前步骤信息
			updateCurrentInfo() {
				this.countDownTime = this.timerList[this.currentStep.index].time
				this.currentStep.title = this.timerList[this.currentStep.index].title
			},
			// 更新下个步骤信息
			updateNextInfo() {
				this.nextStep.index = this.next(this.nextStep.index)
				this.nextStep.time = this.$time.secondsToString(this.timerList[this.nextStep.index].time)
				this.nextStep.title = this.timerList[this.nextStep.index].title
			},
			// 更新页面信息
			updatePageInfo() {
				this.updateCurrentInfo()
				this.updateNextInfo()
			},
			updateLeftStep() {
				this.currentStep.leftStep--

				if (this.currentStep.leftStep < 0) {
					this.countDownTime = 0
					this.ringtongAudio.stop()
					this.gotoIndexPage('loop')
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
				this.ringtoneAudio.stop()
				this.$refs.countDown.seconds = this.timerList[this.currentStep.index].time + 1
			},
			// 退出返回首页
			goback() {
				this.countDownTime = 0
				this.ringtoneAudio.stop()
				this.gotoIndexPage('loop')
			},
			// 跳转到下一步骤
			goNextStep() {
				// 索引号 + 1
				this.currentStep.index = this.next(this.currentStep.index)
				this.updatePageInfo()
				this.updateLeftStep()
				this.ringtoneAudio.stop()
			},
			// 计时器进行时触发的函数
			change(countDownTime) {
				// 更新界面上显示的剩余时间
				this.currentStep.leftTime = this.$time.secondsToString(countDownTime)
				// 剩余时间为5秒的时候播放铃声
				if (countDownTime <= 5 && countDownTime >= 0 && this.ringtoneAudio.paused) {
					this.ringtoneAudio.play()
				} else if (countDownTime <= 0) {
					this.ringtoneAudio.stop()
				}
			},
			// 计时器停止时触发的函数
			end() {
				// 停止铃声
				this.ringtoneAudio.stop()
				// 当前索引号 + 1
				this.currentStep.index = this.next(this.currentStep.index)
				this.updatePageInfo()
				this.updateLeftStep()
			}
		},
		created() {
			this.timerList = this.storage.currentLoopTimer.timerList

			const cycleTimes = this.storage.currentLoopTimer.cycleTimes

			if (this.timerList.length === 0) {
				this.toastThenJumpToIndex('计时器列表不能为空', 'loop')
			} else if (cycleTimes <= 0) {
				this.toastThenJumpToIndex('循环次数必须是正整数', 'loop')
			} else {
				// 剩余步骤次数 = 计时器组列表长度 * 循环次数 - 1
				this.currentStep.leftStep = this.timerList.length * cycleTimes - 1
				this.createRingtoneAudio()
				this.updatePageInfo()
			}


		}
	}
</script>

<style lang="scss" scoped>
	.main {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-bottom: 40px;
		box-sizing: border-box;
	}

	.panel {
		width: 100%;

		.loopTimerLeftTimeText {
			font-size: 150rpx;
			width: 100%;
			display: flex;
			justify-content: center;
		}

		.nextTimerInfo {
			display: flex;
			justify-content: space-around;
			margin-top: 25px;

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
	}

	.buttonGroup {
		width: 100%;
		display: flex;
		justify-content: space-around;


		.button {
			border: 1px solid #F1F1F1;
			width: 90rpx;
			height: 90rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
			color: rgb(34, 131, 246);
			box-shadow: 0 4px 5px rgba(0, 0, 0, 0.19);
		}
	}
</style>
