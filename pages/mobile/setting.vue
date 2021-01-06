<!-- 设置页面 -->
<template>
	<view class="settingPage">
		<!-- 音量设置 -->
		<view class="title">音量设置</view>
		<u-slider v-model="volume" class="volumeSlider" @end="volumeSliderEnd"></u-slider>
		<!-- 铃声设置 -->
		<view class="title">铃声设置</view>
		<u-select v-model="showRingtoneSetting" :list="ringtoneList" @confirm="confirmRingtone"></u-select>
		<u-button @click="showRingtoneSetting = true" size="medium" type="primary" class="ringtoneButton" plain>{{ringtoneList[ringtone].label}}</u-button>
		
		<!-- 保存按钮 -->
		<view class="saveButton" @click="saveSetting">
			<u-icon name="checkmark" size="50"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 是否显示铃声选择
				showRingtoneSetting: null,
				// 铃声列表
				ringtoneList: [],
				// 铃声音频对象
				ringtoneAudio:{}
			}
		},
		methods: {
			// 保存设置
			saveSetting(){
				// 更新本地存储中的设置
				uni.setStorage({
					key:'setting',
					data:{
						volume:this.volume,
						ringtone:this.ringtone
					}
				})
				// 停止铃声
				this.ringtoneAudio.stop()
				// 返回首页
				uni.navigateTo({
					url:'index'
				})				
			},
			// 确认铃声选择
			confirmRingtone(e){
				// 更新铃声索引号变量
				this.ringtone = e[0].value
				// 更新铃声音频对象的音频文件
				this.ringtoneAudio.src = '../../static/ringtone/' + this.ringtoneList[this.ringtone].label + '.mp3'
				// 播放试听铃声
				this.ringtoneAudio.play()
			},
			// 音量滑块滑动停止时触发的函数
			volumeSliderEnd(){
				// 停止播放铃声
				this.ringtoneAudio.stop()
				// 重新设置铃声
				this.ringtoneAudio.volume = this.volume/100
				// 重新播放铃声
				this.ringtoneAudio.play()
			}
		},
		onLoad(){
			// 从本地存储中获取设置的音量、铃声
			this.volume = uni.getStorageSync('setting').volume;
			this.ringtone = uni.getStorageSync('setting').ringtone;
			this.ringtoneList = uni.getStorageSync('ringtoneList')
			// 创建铃声对象
			this.ringtoneAudio = uni.createInnerAudioContext()
			this.ringtoneAudio.src = '../../static/ringtone/' + this.ringtoneList[this.ringtone].label + '.mp3'
			this.ringtoneAudio.volume = this.volume/100
		}
	}
</script>

<style lang="less" scoped>
	page {
		height: 100%;
	}

	.settingPage {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.title{
		font-size: 40rpx;
	}
	
	.volumeSlider{
		width: 70%;
		margin-top: 40rpx;
		margin-bottom: 60rpx;
	}
	
	.ringtoneButton{
		font-size: 35rpx;
		margin: 30rpx;
	}
	
	.saveButton {
		border: 1px solid #F1F1F1;
		width: 90rpx;
		height: 90rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		color: rgb(34, 131, 246);
		box-shadow: 0 7rpx 10rpx rgba(0, 0, 0, 0.19);
		margin-top: 150rpx;
	}
</style>
