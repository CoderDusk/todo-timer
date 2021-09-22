<template>
	<!-- 已保存的循环计时器组列表 -->
	<view class="listPage">
		<!-- 计时器列表 -->
		<scroll-view scroll-y="true" class="timerList">
			<view class="timer" v-for="(item,index) in storage.savedLoopTimerList" :key="item.id"
				@click="chooseTimerGroup(item)">
				<text class="time">{{item.title}}</text>
				<span @click.stop="remove(index)">
					<u-icon name="trash" color="red" size="40" class="deleteIcon"></u-icon>
				</span>
			</view>
		</scroll-view>

		<!-- 底部按钮组 -->
		<view class="buttonGroup">
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
			return {}
		},
		methods: {
			// 删除计时器组
			remove(index) {
				this.storage.savedLoopTimerList.splice(index, 1)
				this.updateStorage()
			},
			// 选择计时器组并把它设置为临时循环计时器组
			chooseTimerGroup(item) {
				this.storage.currentLoopTimer = {
					title:item.title,
					cycleTimes:item.count,
					timerList:item.list,
				}
				this.updateStorage()
				uni.navigateTo({
					url:'index'
				})
			}
		},
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
