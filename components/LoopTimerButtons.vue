<template>
	<view class="bottomButtonGruop">
		<navigator url="/pages/loopTimerGroupList">
			<view class="button">
				<u-icon name="list-dot" size="50"></u-icon>
			</view>
		</navigator>

		<view class="button" @click="startLoopTimer">
			<u-icon name="play-right-fill" size="50"></u-icon>
		</view>

		<navigator url="setting?from=loop">
			<view class="button">
				<u-icon name="setting-fill" size="50"></u-icon>
			</view>
		</navigator>

	</view>
</template>

<script>
	export default {
		name: "LoopTimerButtons",
		data() {
			return {

			};
		},
		methods: {
			// 开始循环计时器,跳转到循环计时器页面
			startLoopTimer() {
				this.getStorage()
				// 如果循环计时器组为空就弹出警告
				if (this.storage.currentLoopTimer.timerList.length == 0) {
					this.$u.toast(this.$t('index.cycle.cycleTimerGroupEmptyTip'))
				} else if (this.storage.currentLoopTimer.cycleTimes <= 0) {
					this.$u.toast(this.$t('index.cycle.cyclceTimesWrongTip'))
				} else {
					// 跳转到循环计时器页面
					uni.navigateTo({
						url: '/pages/loopCountDown'
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	.bottomButtonGruop {
		width: 100%;
		display: flex;
		justify-content: space-around;
	}

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
</style>