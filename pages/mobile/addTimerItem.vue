<template>
	<!-- 新增计时器 -->
	<view class="editPage">
		<!-- 主要界面中不显示的 时间选择器和错误提示框 -->
		<u-picker v-model="isPickerShow" mode="time" :params="pickerParams" default-time="00:00:00"
		 @confirm="confirmPicker"></u-picker>
		<u-toast ref="toast" />
		
		<!-- 计时器名称 -->
		<view class="title">计时器名称</view>
		<input type="text" placeholder="请输入计时器名称" class="inputTitle" placeholder-class="placeholder" v-model="title">
		
		<!-- 计时器时长 -->
		<view class="title timerDuration">计时器时长</view>
		<u-button @click="isPickerShow = true" size="medium" type="primary" class="ringtoneButton" plain>{{time === 0 ?'请设置计时器':showtime}}</u-button>
		
		<!-- 底部按钮组 -->
		<view class="bottomButtonGruop">
			<navigator url="index">
				<view class="button">
					<u-icon name="close" size="50" color="red"></u-icon>
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
				// 控制时间选择器是否显示的开关变量
				isPickerShow:false,
				// 时间选择器参数
				pickerParams: {
					hour: true,
					minute: true,
					second: true
				},
				// 标题
				title:'',
				// 时间
				time:0,
				// 显示的时间
				showtime:''				
			}
		},
		methods: {
			// 确认时间选择器时触发的函数
			confirmPicker(e){
				const time = this.mytime.timerPickerResultToSeconds(e)
				if(time !== 0){
					this.time = time
				}else{
					this.$u.toast('计时器时长不能为0')
					// 把秒数转换成显示用的字符串
					this.showtime = this.mytime.secondsToString(this.time)
				}
			},
			// 添加计时器
			addTimerItem(){
				// 如果标题或者时间为空，弹出错误提示
				if(this.title.trim() === '' || this.time === 0){
					this.$refs.toast.show({
						title: '请设置所有项目',
						type: 'error',
						position:'top'
					})
				}else{
					// 从本地存储获取临时循环计时器组
					let newTempLoopTimerGroup  = uni.getStorageSync('tempLoopTimerGroup')
					// 把当前计时器追加到临时循环计时器组
					newTempLoopTimerGroup.timerList.push({
						title:this.title,
						time:this.time,
						showtime:this.showtime
					})					
					// 把新的临时循环计时器组更新到本地存储
					uni.setStorage({
						key:'tempLoopTimerGroup',
						data:newTempLoopTimerGroup
					})
					// 返回首页
					uni.navigateTo({
						url:'index'
					})
				}
			}
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
		// justify-content: center;
		align-items: center;
		padding-top: 45%;
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
