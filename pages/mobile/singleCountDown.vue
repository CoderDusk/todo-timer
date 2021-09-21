<template>
	<!-- 单次计时器页面 -->
	<view>
		<!-- vue awsome countdown组件 -->
		<vac :left-time="storage.currentSingleTimer *1000" ref="singleTimer" @process="onProcess" @finish="finished">
			<view class="singleTimerLeftTimeText">{{showTime}}</view>
		</vac>

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
				// 倒计时组件状态，默认为进行中
				isPaused:false,
				// 界面上显示的剩余时间
				showTime:'',
			};
		},
		methods: {
			// 暂停
			pause() {
				this.$refs.singleTimer.pauseCountdown()
				this.isPaused = true
			},
			// 重启
			restart() {
				this.$refs.singleTimer.startCountdown(true)
			},
			// 返回
			goback() {
				this.$refs.singleTimer.stopCountdown()
				this.ringtoneAudio.stop()
				uni.navigateTo({
					url: 'index'
				})
			},
			// 继续
			continueTimer () {
				this.$refs.singleTimer.startCountdown()
				this.isPaused = false
			},
			// 计时器组件进行中触发的函数
			onProcess() {
				let leftTime = this.$refs.singleTimer.timeObj.ceil.s
				this.showTime = this.$time.secondsToString(leftTime)
				// 剩余时间为5秒的时候开始播放铃声
				if (leftTime <= 5 && leftTime > 0 && this.ringtoneAudio.paused !== false) {
					this.ringtoneAudio.play()
				}
				if(leftTime === 0 ){
					this.ringtoneAudio.stop()
				}

			},
			// 计时器完成时触发的函数
			finished() {
				this.ringtoneAudio.stop()
				this.goback()
			},
			
		},
		created() {
			// 如果时间小于1就退回首页
			if (this.storage.currentSingleTimer < 1) {
				this.$u.toast('请先设置计时器')
				uni.navigateTo({
					url: 'index'
				})
			}
			
			this.createRingtoneAudio()
		},
		beforeDestroy() {
			this.$refs.singleTimer.stopCountdown()
			this.ringtoneAudio.stop()
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

	.singleTimerLeftTimeText {
		font-size: 150rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		top: 30%;
		position: absolute;
	}
</style>
