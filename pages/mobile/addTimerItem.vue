<template>
	<view class="editPage">
		<view class="title">计时器名称</view>
		<input type="text" placeholder="请输入计时器名称" class="inputTitle" placeholder-class="placeholder" v-model="title">
		<view class="title timerDuration">计时器时长</view>
		<u-button @click="isPickerShow = true" size="medium" type="primary" class="ringtoneButton" plain>{{time === 0 ?'请设置计时器':showtime}}</u-button>
		<u-picker v-model="isPickerShow" mode="time" :params="pickerParams" default-time="00:00:00"
		 @confirm="confirmPicker"></u-picker>
		<u-toast ref="toast" />
		<view class="bottomButtonGruop">
			<navigator url="index">
				<view class="button">
					<u-icon name="close" size="50"></u-icon>
				</view>
			</navigator>
			<view class="button" @click="addTimerItem">
				<u-icon name="checkmark" size="50"></u-icon>
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
				title:'',
				time:0,
				showtime:''
				
			}
		},
		methods: {
			confirmPicker(e){
				this.time = e.hour*3600 + e.minute*60 + e.second*1 
				this.showtime = this.mytime.secondsToString(this.time)
			},
			addTimerItem(){
				if(this.title === '' || this.time === 0){
					this.$refs.toast.show({
						title: '请设置所有项目',
						type: 'error',
						position:'top'
					})
				}else{
					
					let newTempLoopTimerGroup  = uni.getStorageSync('tempLoopTimerGroup')
					
					newTempLoopTimerGroup.timerList.push({
						title:this.title,
						time:this.time,
						showtime:this.showtime
					})
					
					
					uni.setStorage({
						key:'tempLoopTimerGroup',
						data:newTempLoopTimerGroup
					})
					
					uni.navigateTo({
						url:'index'
					})
				}
			}
		},
		onLoad(){
			
		}
	}
</script>

<style lang="less" scoped>
	page {
		height: 100%;
	}

	.editPage {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.title{
		font-size: 40rpx;
	}
	
	.timerDuration{
		margin-top: 50rpx;
	}
	
	.inputTitle{
		margin: 25rpx 0;
		font-size: 40rpx;
		border-bottom: 1rpx solid black;
		text-align: center;
		.placeholder{
			text-align: center;
		}
		
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
</style>
