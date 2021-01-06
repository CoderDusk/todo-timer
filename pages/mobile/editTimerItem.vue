<template>
	<!-- 编辑计时器 -->
	<view class="editPage">
		<!-- 页面中不显示的 时间选择器、错误提示 -->
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
			<view class="button" @click="deleteTimerItem">
				<u-icon name="trash" size="50" color="red"></u-icon>
			</view>
			<view class="button" @click="editTimerItem">
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
				// 临时循环计时器组
				tempLoopTimerGroup:null,
				// 要编辑的计时器在临时循环计时器组中的索引号
				index:null,
				// 标题
				title:'',
				// 时间
				time:0,
				// 显示的时间
				showtime:'',				
			}
		},
		methods: {
			// 确认时间选择器时触发的函数
			confirmPicker(e){
				// 把时间选择器传回的结果转换成秒数
				this.time = e.hour*3600 + e.minute*60 + e.second*1 
				// 把秒数转换成显示用的字符串
				this.showtime = this.mytime.secondsToString(this.time)
			},
			// 编辑计时器
			editTimerItem(){
				// 如果标题或时间为空,弹出错误提示
				if(this.title === '' || this.time === 0){
					this.$refs.toast.show({
						title: '请设置所有项目',
						type: 'error',
						position:'top'
					})
				}else{
					// 更新临时循环计时器组的计时器列表
					this.tempLoopTimerGroup.timerList[this.index]={
						title:this.title,
						time:this.time
					}
					// 把新的临时循环计时器组更新到本地存储
					uni.setStorage({
						key:'tempLoopTimerGroup',
						data:this.tempLoopTimerGroup
					})
					// 返回到首页
					uni.navigateTo({
						url:'index'
					})
				}
			},
			// 删除当前计时器
			deleteTimerItem(){
				this.tempLoopTimerGroup.timerList.splice(this.index,1)
				uni.setStorage({
					key:'tempLoopTimerGroup',
					data:this.tempLoopTimerGroup
				})
				
				uni.navigateTo({
					url:'index'
				})
			}
		},
		onLoad(){
			// 从全局变量中获取当前要编辑的计时器在临时循环计时器组中的索引号
			this.index = getApp().globalData.currentEditTimerItem
			// 如果索引号为空就返回首页并终止执行
			if(this.index == undefined){
				uni.navigateTo({
					url:'index'
				})
				
				return
			}
			// 从本地存储中读取临时 循环计时器组、要编辑的计时器的标题、时间
			this.tempLoopTimerGroup = uni.getStorageSync('tempLoopTimerGroup');
			this.title = this.tempLoopTimerGroup.timerList[this.index].title
			this.time = this.tempLoopTimerGroup.timerList[this.index].time
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
		// background-color: pink;
		.placeholder{
			// color: green;
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
