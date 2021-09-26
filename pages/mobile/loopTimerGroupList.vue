<template>
	<!-- 已保存的循环计时器组列表 -->
	<view class="main">
		<!-- 计时器列表 -->
		<scroll-view scroll-y class="timer-list">
			<!--  #ifdef  MP-WEIXIN -->
			<!-- 如果是微信小程序，就添加两个空白的区域，用以填充状态栏和胶囊按钮区域 -->
			<view class="padding-for-mp-weixin">
				<view class="status-bar"></view>
				<view class="pill-buttons" :style="{ height: `${pillButtonInfo.height}px` }"></view>
			</view>
			<!--  #endif -->
			<view v-if="storage.savedLoopTimerList.length === 0">
				<u-empty text="没有已保存的循环计时器"></u-empty>
			</view>
			<view v-else class="timer" v-for="(item,index) in storage.savedLoopTimerList" :key="item.id"
				@click="chooseTimerGroup(item)">
				<text class="time">{{item.title}}</text>
				<span @click.stop="remove(index)">
					<u-icon name="trash" color="red" size="40" class="deleteIcon"></u-icon>
				</span>
			</view>
		</scroll-view>

		<!-- 底部按钮组 -->
		<view class="button-group">
			<view class="button" @click="gotoIndexPage('loop')">
				<u-icon name="checkmark" size="50"></u-icon>
			</view>
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
				this.toastThenJumpToIndex('删除成功', 'loop')
			},
			// 选择计时器组并把它设置为临时循环计时器组
			chooseTimerGroup(item) {
				this.storage.currentLoopTimer = {
					title: item.title,
					cycleTimes: item.count,
					timerList: item.list,
				}
				this.updateStorage()
				this.toastThenJumpToIndex('选择成功', 'loop')
			}
		},
	}
</script>

<style lang="less" scoped>
	.main {
		height: 100%;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
		justify-content: space-between;
		padding-bottom: 20px;
	}

	.timer-list {
		width: 100%;
		height: 50%;
	}

	.timer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 50px;
		margin: 15px;
		box-shadow: 0 4px 5px rgba(0, 0, 0, 0.19);

		.time {
			padding-left: 80rpx;
			font-size: 40rpx;
			font-weight: bold;
		}

		.deleteIcon {
			padding-right: 50rpx;
		}
	}

	.button-group {
		width: 100%;
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
			box-shadow: 0 3px 5px rgba(0, 0, 0, 0.19);
		}
	}
</style>
