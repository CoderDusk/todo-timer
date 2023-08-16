<template>
	<!-- 底部按钮组 -->
	<view class="bottomButtonGruop">
		<navigator url="/pages/singleTimerList">
			<view class="button">
				<u-icon name="list-dot" size="50"></u-icon>
			</view>
		</navigator>
		<view class="button" @click="startSingleTimer">
			<u-icon name="play-right-fill" size="50"></u-icon>
		</view>
		<navigator url="setting?from=single">
			<view class="button">
				<u-icon name="setting-fill" size="50"></u-icon>
			</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		methods:{
			// 开始单次计时器,跳转到单次计时器页面
			startSingleTimer() {
				this.getStorage()
				// 如果临时单次计时器时间大于0才跳转到单次计时器页面
				if (this.storage.currentSingleTimer > 0) {
					uni.navigateTo({
						url: '/pages/singleCountDown'
					})
					// 如果不大于0说明则显示错误提示
				} else {
					this.$u.toast('请先设置计时器')
				}
			
			}
		},
	}
</script>

<style lang="scss" scoped>
	.bottomButtonGruop {
		width: 100%;
		display: flex;
		background-color: white;
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
