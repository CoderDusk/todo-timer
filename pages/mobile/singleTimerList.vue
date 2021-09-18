<template>
	<!-- 已保存的单次计时器列表页面 -->
	<view class="listPage">
		<!-- 计时器列表 -->
		<scroll-view scroll-y="true" class="timerList">
			<view class="timer" v-for="(item,index) in computedList" :key="index" @click="chooseTimer(index)">
				<text class="time">{{item}}</text>
				<u-icon name="trash" color="red" size="40" class="deleteIcon" @click="remove(index)"></u-icon>
			</view>
		</scroll-view>

		<!-- 时间选择器 -->
		<u-picker v-model="isPickerShow" mode="time" :params="pickerParams" default-time="00:00:00" @confirm="confirmPicker"></u-picker>

		<!-- 底部按钮组 -->
		<view class="buttonGroup">
			<view class="button" @click="isPickerShow = true">
				<u-icon name="plus" size="50"></u-icon>
			</view>
			<navigator url="index">
				<view class="button">
					<u-icon name="checkmark" size="50"></u-icon>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 计时器列表
				timerList: [],
				// 计算后用于显示的列表
				computedList: [],
				// 是否显示时间选择器
				isPickerShow: false,
				// 时间选择器参数
				pickerParams: {
					hour: true,
					minute: true,
					second: true
				},
			}
		},
		methods: {
			// 确认时间选择器时触发的函数
			confirmPicker(e) {
				const time = e.hour * 3600 + e.minute * 60 + e.second * 1 
				// 如果返回的时间不为空进行接下来的流程
				if (time !== 0) {
					// 把新计时器追加到计时器列表
					this.timerList.push(time)
					// 新计时器排序
					this.timerList = Array.from(new Set(this.timerList))
					// 把新计时器保存到本地存储
					uni.setStorage({
						key: 'singleTimerList',
						data: this.timerList
					})

					this.updateComputedList()
				}else{
					this.$u.toast('请设置正确的时长')
				}
			},
			updateComputedList() {
				// 排序
				let sortedList = this.timerList.sort(function(a, b) {
					return a - b
				})

				this.computedList = []
				sortedList.forEach(item=>{
					this.computedList.push(this.mytime.secondsToString(item))
				})
			},
			// 删除计时器
			remove(index) {
				this.timerList.splice(index, 1)
				uni.setStorage({
					key: 'singleTimerList',
					data: this.timerList
				})
			},
			// 选择计时器并将其设置为临时单次计时器
			chooseTimer(index) {
				uni.setStorage({
					key: 'tempSingleTimer',
					data: this.timerList[index]
				})
				uni.navigateTo({
					url: 'index'
				})
			}
		},
		onLoad() {
			// 获取本地存储中的已保存的单次计时器列表
			this.timerList = uni.getStorageSync('singleTimerList');
			if (this.timerList == '') {
				this.timerList = []
			}
			this.updateComputedList()
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
