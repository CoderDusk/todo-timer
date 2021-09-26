<template>
	<!-- 单次计时器页面 -->
	<view class="main">
		<view></view>
		<!-- vue awsome countdown组件 -->
		<!-- <vac :left-time="storage.currentSingleTimer *1000" ref="singleTimer" @process="onProcess" @finish="finished">
			<view class="singleTimerLeftTimeText">{{showTime}}</view>
		</vac> -->
		<view class="singleTimerLeftTimeText">{{$time.secondsToString(leftTime)}}</view>

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
		
		<u-count-down style="display: none;" ref="uCountDown" :timestamp="countDownTime" @change="change" @end="finished()"></u-count-down>
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
				// 剩余时间
				leftTime:0,
				// 计时器组件时间
				countDownTime:0,
				// 暂停时临时保存时间的
				tempPauseTime:0,
			};
		},
		methods: {
			change(e){
				this.leftTime = e
				// 剩余时间为5秒的时候开始播放铃声
				if (e <= 5 && e > 0 && this.ringtoneAudio.paused !== false) {
					this.ringtoneAudio.play()
				}
				if(e === 0 ){
					this.ringtoneAudio.stop()
				}
			},
			// 暂停
			pause() {
				this.tempPauseTime = this.leftTime
				this.countDownTime = 0
				this.isPaused = true
			},
			// 重启
			restart() {
				this.countDownTime = 0
				console.log('重启')
				this.countDownTime = this.storage.currentSingleTimer
			},
			// 返回
			goback() {
				this.countDownTime = 0
				this.ringtoneAudio.stop()
				this.gotoIndexPage('loop')
			},
			// 继续
			continueTimer () {
				this.countDownTime = this.tempPauseTime
				this.isPaused = false
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
				this.toastThenJumpToIndex('请先设置计时器','loop')
			}
			
			this.createRingtoneAudio()
			
			this.countDownTime = this.storage.currentSingleTimer
		},
		beforeDestroy() {
			this.$refs.singleTimer.stopCountdown()
			this.ringtoneAudio.stop()
		}
	}
</script>

<style lang="less" scoped>
	.main {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-bottom: 40px;
		box-sizing: border-box;
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
