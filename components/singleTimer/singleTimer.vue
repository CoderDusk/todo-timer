<template>
	<view class="main">
		<!-- <timer class="singleTimer"></timer> -->
		<u-toast ref="warningToast" class="warningToast" />
		<view class="timerSetting">
			<view v-model="singleTimerString">{{singleTimerString}}</view>
			<u-button type="primary" plain shape="circle" @click="isPickerShow = true" class="singleTimerSettingButton">设置计时器</u-button>
			<u-picker v-model="isPickerShow" mode="time" :params="pickerParams" default-time="00:00:00"
			 @confirm="confirmSingleTimerPicker"></u-picker>
		</view>

		<view class="bottomButtonGruop">
			<view class="button" @click="gotoListPage">
				<u-icon name="list-dot" size="50"></u-icon>
			</view>
			<view class="button" @click="startSingleTimer">
				<u-icon name="play-right-fill" size="50"></u-icon>
			</view>
			<view class="button" @click="gotoSettingPage">
				<u-icon name="volume-up-fill" size="50"></u-icon>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				isPickerShow:false,
				pickerParams: {
					hour: true,
					minute: true,
					second: true
				},
				tempSingleTimer:0
			};
		},
		methods: {
			confirmSingleTimerPicker(e){
				this.tempSingleTimer = this.mytime.timeToSeconds(e.hour,e.minute,e.second)
				uni.setStorage({
					key:'tempSingleTimer',
					data:this.tempSingleTimer
				})
				getApp().globalData.currentTimer = {
					type:'singleTimer',
					time:this.tempSingleTimer
				}
			},
			startSingleTimer(){
				if(getApp().globalData.currentTimer.type === 'singleTimer'){
					uni.navigateTo({
						url:'../../pages/mobile/timer'
					})
				}else{
					this.$refs.warningToast.show({
						title:'请先设置计时器',
						type:'error',
						position:'top'
					})
				}
				
			},
			gotoSettingPage(){
				uni.navigateTo({
					url:'../../pages/mobile/setting'
				})
			},
			gotoListPage(){
				uni.navigateTo({
					url:'../../pages/mobile/singleTimerList'
				})
			}
		},
		computed:{
			singleTimerString:function(){
				return this.mytime.secondsToString(this.tempSingleTimer)
			}
		},
		activated() {
			this.tempSingleTimer = uni.getStorageSync('tempSingleTimer')
			getApp().globalData.currentTimer = {
				type:'singleTimer',
				time:uni.getStorageSync('tempSingleTimer')
			}
		},
		created() {
			this.tempSingleTimer = uni.getStorageSync('tempSingleTimer')
			getApp().globalData.currentTimer = {
				type:'singleTimer',
				time:uni.getStorageSync('tempSingleTimer')
			}
		}
	}
</script>

<style lang="less" scoped>
	.main{
		width: 100%;
		display: flex;
	}

	.bottomButtonGruop {
		width:750rpx;
		bottom: 10%;
		position: absolute;
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
			box-shadow: 0 7rpx 10rpx rgba(0, 0, 0, 0.19);
		}
	}	
	
	.timerSetting{
		width: 100%;
		font-size: 120rpx;
		padding-top: 45%;
		display: flex;
		flex-direction: column;
		align-items: center;

		.singleTimerSettingButton{
			margin: 40rpx;
			font-size: 40rpx;
		}
	}
	
	.warningToast{
		font-size: 40rpx;
		width: 400rpx;
	}
</style>
