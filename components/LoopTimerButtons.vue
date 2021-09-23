<template>
	<view class="bottomButtonGruop">
		<navigator url="../../pages/mobile/loopTimerGroupList">
			<view class="button">
				<u-icon name="list-dot" size="50"></u-icon>
			</view>
		</navigator>

		<view class="button" @click="startLoopTimer">
			<u-icon name="play-right-fill" size="50"></u-icon>
		</view>

		<navigator url="../../pages/mobile/setting">
			<view class="button">
				<u-icon name="volume-up-fill" size="50"></u-icon>
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
				// 如果循环计时器组为空就弹出警告
				if (this.storage.currentLoopTimer.timerList.length == 0) {
					this.$refs.warningToast.show({
						title: '计时器组至少需要一个计时器',
						type: 'error',
						position: 'top',
						icon: false
					})
				} else if (this.storage.currentLoopTimer.cycleTimes <= 0) {
					this.$u.toast('循环次数应当为一个正整数')
				} else {
					// 跳转到循环计时器页面
					uni.navigateTo({
						url: '../../pages/mobile/loopCountDown'
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	.bottomButtonGruop {
		width: 750rpx;
		bottom: 10%;
		position: absolute;
		display: flex;
		justify-content: space-around;
	}
</style>
