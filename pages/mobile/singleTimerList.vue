<template>
	<view class="listPage">
		<scroll-view scroll-y="true" class="timerList">
			<view class="timer" v-for="(item,index) in computedList" :key="index" @click="chooseTimer(index)">
				<text class="time">{{item}}</text>
				<u-icon name="trash" color="red" size="40" class="deleteIcon" @click="remove(index)"></u-icon>
			</view>
		</scroll-view>
		<u-picker v-model="isPickerShow" mode="time" :params="pickerParams" default-time="00:00:00" @confirm="confirmPicker"></u-picker>
		<view class="buttonGroup">
			<view class="button" @click="isPickerShow = true">
				<u-icon name="plus" size="50"></u-icon>
			</view>
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
				originList: [50, 100, 330, 10],
				isPickerShow: false,
				pickerParams: {
					hour: true,
					minute: true,
					second: true
				},
			}
		},
		computed: {
			computedList: function() {
				let sortedList =  this.originList.sort(function(a,b){
					return a-b
				})

				let newList = []
				for (let i = 0; i < sortedList.length; i++) {
					newList.push(this.mytime.secondsToString(sortedList[i]))
				}


				return newList
			}
		},
		methods: {
			goback() {
				uni.navigateTo({
					url: 'index'
				})
			},
			confirmPicker(e) {
				if(e.hour*1+e.minute*1+e.second*1 !== 0){
					this.originList.push(parseInt(e.hour * 3600 + e.minute * 60 + e.second * 1))
					this.originList = Array.from(new Set(this.originList))
					uni.setStorage({
						key: 'singleTimerList',
						data: this.originList
					})
				}
			},
			remove(index){
				this.originList.splice(0,1)
				uni.setStorage({
					key: 'singleTimerList',
					data: this.originList
				})
			},
			chooseTimer(index){
				uni.setStorage({
					key:'tempSingleTimer',
					data:this.originList[index]
				})
				uni.navigateTo({
					url:'index'
				})
			}
		},
		onLoad() {
			this.originList = uni.getStorageSync('singleTimerList');
			if(this.originList == ''){
				this.originList = []
			}
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
