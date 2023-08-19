<template>
	<!-- 单次计时器页面 -->
	<view class="main">
		<view></view>
		<view class="singleTimerLeftTimeText">
			{{ $time.secondsToString(leftTime) }}
		</view>

		<!-- 按钮组 -->
		<view class="buttonGroup">
			<view class="button" @click="restart">
				<u-icon name="reload" size="50"></u-icon>
			</view>
			<view class="button" @click="pause" v-if="isPaused === false">
				<u-icon name="pause" size="50"></u-icon>
			</view>
			<view class="button" @click="continueTimer" v-else>
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
			// 剩余时间
			leftTime: 0,
			// 定时器ID
			timerId: "",
			isPaused: false,
		};
	},
	watch: {
		leftTime(value) {
			if (value === 5) {
				this.playAudio()
			} else if (value === 0) {
				this.stopAudio()
				clearInterval(this.timerId)
				this.gotoIndexPage('single')
			}
		},
	},
	methods: {
		startTimer() {
			this.timerId = setInterval(() => {
				this.leftTime--
				if (this.leftTime === 0) {
					clearInterval(this.timerId)
				}
			}, 1000)
		},
		playAudio() {
			const {
				paused
			} = this.ringtoneAudio

			if (paused && !this.isPaused && this.leftTime <= 5 && this.leftTime >= 1) {
				this.ringtoneAudio.play()
			}
		},
		leavePage() {
			this.ringtoneAudio.destroy()
			clearInterval(this.timerId)
		},
		stopAudio() {
			this.ringtoneAudio.stop()
		},
		// 暂停
		pause() {
			this.stopAudio()
			clearInterval(this.timerId)
			// 暂停状态变量设置为暂停
			this.isPaused = true
		},
		// 重启
		restart() {
			this.stopAudio()
			clearInterval(this.timerId)
			this.leftTime = this.storage.currentSingleTimer
			this.startTimer()
		},
		// 返回
		goback() {
			this.stopAudio()
			this.leftTime = 0
			clearInterval(this.timerId)
			this.gotoIndexPage('single')
		},
		// 继续
		continueTimer() {
			this.startTimer()
			this.isPaused = false
		},

	},
	created() {
		// 如果时间小于1就退回首页
		if (this.storage.currentSingleTimer < 1) {
			this.toastThenJumpToIndex(this.$t('index.single.noSavedTimerTips'))
		}

		this.createRingtoneAudio()
		this.leftTime = this.storage.currentSingleTimer
		this.startTimer()
	},
	onUnload() {
		this.leavePage()
	},
	beforeDestroy() {
		this.leavePage()
	},
	onHide() {
		this.leavePage()
	},
}
</script>

<style lang="scss" scoped>
.main {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-bottom: 40px;
	box-sizing: border-box;
	background-color: white;
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

.singleTimerLeftTimeText {
	font-size: 150rpx;
	width: 100%;
	display: flex;
	justify-content: center;
}
</style>