<template>
	<!-- 单次计时器页面 -->
	<view>
		<!-- vue awsome countdown组件 -->
		<vac :left-time="time*1000" ref="singleTimer" @process="onProcess" @finish="finished">
		  <view class="singleTimerLeftTimeText">{{showTime}}</view>
		</vac>
		
		<!-- 按钮组 -->
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
				// 倒计时时间
				time:0,
				// 倒计时组件状态，默认为进行中
				state:'process',
				// 铃声音频对象
				ringtoneAudio:null,
				// 显示的时间
				showTime:''
			};
		},
		methods:{
			// 暂停
			pause(){
				this.$refs.singleTimer.pauseCountdown()
				this.state = 'paused'
			},
			// 重启
			restart(){
				this.$refs.singleTimer.startCountdown(true)
			},
			// 返回
			goback(){
				this.$refs.singleTimer.stopCountdown()
				this.ringtoneAudio.stop()
				uni.navigateTo({
					url:'index'
				})
			},
			// 继续
			goOn(){
				this.$refs.singleTimer.startCountdown()
				this.state = 'process'
			},
			// 计时器组件进行中触发的函数
			onProcess(){
				let leftTime = this.$refs.singleTimer.timeObj.ceil.s
				this.showTime = this.mytime.secondsToString(leftTime)
				// 剩余时间为5秒的时候开始播放铃声
				if(leftTime == 5){
					this.ringtoneAudio.play()
				}
				
			},
			// 计时器完成时触发的函数
			finished(){
				this.ringtoneAudio.stop()
				this.goback()
			}
			
		},
		onLoad(){
			// 从本地存储中获取临时单次计时器
			this.time = uni.getStorageSync('tempSingleTimer')

			// 如果时间小于1就退回首页
			if(this.time < 1){
				uni.navigateTo({
					url:'index'
				})
			}
			
			// 从本地存储中获取设置中的 音量、铃声
			let volume = uni.getStorageSync('setting').volume;
			let ringtone = uni.getStorageSync('setting').ringtone;
			let ringtoneList = uni.getStorageSync('ringtoneList')
			// 创建音频对象
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
