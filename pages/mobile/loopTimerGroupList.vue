<template>
	<view class="listPage">
		<scroll-view scroll-y="true" class="timerList">
			<view class="timer" v-for="(item,index) in loopTimerGroupList" :key="index" @click="chooseTimerGroup(index)">
				<text class="time">{{item.title}}</text>
				<u-icon name="trash" color="red" size="40" class="deleteIcon" @click="remove(index)"></u-icon>
			</view>
		</scroll-view>

		<view class="buttonGroup">
			<view class="button" @click="goback">
				<u-icon name="checkmark" size="50"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isPickerShow: false,
				pickerParams: {
					hour: true,
					minute: true,
					second: true
				},
				loopTimerGroupList:null
			}
		},
		methods: {
			goback() {
				uni.navigateTo({
					url: 'index'
				})
			},
			remove(index){
				this.loopTimerGroupList.splice(0,1)
				uni.setStorage({
					key: 'loopTimerGroupList',
					data: this.loopTimerGroupList
				})
			},
			chooseTimerGroup(index){

				uni.setStorage({
					key:'tempLoopTimerGroup',
					data:{
						timerList:this.loopTimerGroupList[index].timerGroup,
						count:this.loopTimerGroupList[index].count
					}
				})
				uni.navigateTo({
					url:'index'
				})
			}
		},
		onLoad() {
			this.loopTimerGroupList = uni.getStorageSync('loopTimerGroupList')
		}
	}
</script>

<style lang="less" scoped>
	page {
		height: 100%;
	}

	.listPage {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.timerList {
		margin-top: 70rpx;
		height: 800rpx;
	}

	.timer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 650rpx;
		height: 100rpx;
		margin: 0 50rpx 40rpx 50rpx;
		box-shadow: 0 7rpx 10rpx rgba(0, 0, 0, 0.19);

		.time {
			padding-left: 80rpx;
			font-size: 40rpx;
			font-weight: bold;
		}

		.deleteIcon {
			padding-right: 50rpx;
		}
	}

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
</style>
