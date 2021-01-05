<template>
	<view class="settingPage">
		<view class="title">音量设置</view>
		<u-slider v-model="volume" class="volumeSlider" @end="ringtoneSliderEnd"></u-slider>
		<view class="title">铃声设置</view>
		<u-select v-model="showRingtoneSetting" :list="ringtoneList" @confirm="confirmRingtone"></u-select>
		<u-button @click="showRingtoneSetting = true" size="medium" type="primary" class="ringtoneButton" plain>{{ringtoneList[ringtone].label}}</u-button>
		<view class="saveButton" @click="saveSetting">
			<u-icon name="checkmark" size="50"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				volume: 10,
				showRingtoneSetting: null,
				ringtoneList: [
					{
					value: 0,
					label: '叮'
					}, 
					{
					value: 1,
					label: '咕咕钟'
					},
					{
					value: 2,
					label: '机械闹钟'
					},
					{
					value:3,
					label: '鸟叫和机械铃声'
					}
				],
				ringtone:1,
				ringtoneAudio:{}
			}
		},
		methods: {
			saveSetting(){
				uni.setStorage({
					key:'setting',
					data:{
						volume:this.volume,
						ringtone:this.ringtone
					}
				})
				
				this.ringtoneAudio.stop()
				
				uni.navigateTo({
					url:'index'
				})
				
			},
			confirmRingtone(e){
				this.ringtone = e[0].value
				this.ringtoneAudio.src = '../../static/ringtone/' + this.ringtoneList[this.ringtone].label + '.mp3'
				this.ringtoneAudio.play()
			},
			ringtoneSliderEnd(){
				this.ringtoneAudio.stop()
				this.ringtoneAudio.volume = this.volume/100
				this.ringtoneAudio.play()
			}
		},
		onLoad(){
			this.volume = uni.getStorageSync('setting').volume;
			this.ringtone = uni.getStorageSync('setting').ringtone;
			
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
