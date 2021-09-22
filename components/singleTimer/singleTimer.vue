<template>
	<view>
		<!-- 不在主要页面的弹出组件：错误警告框、时间选择器 -->
		<u-picker v-model="isPickerShow" mode="time" :params="pickerParams" default-time="00:00:00"
			@confirm="confirmSingleTimerPicker"></u-picker>

		<!-- 单次计时器组件主体 -->
		<view class="singleTimer">
			<!-- 设定计时器 -->
			<view class="timerSetting">
				<view>{{$time.secondsToString(storage.currentSingleTimer)}}</view>
				<u-button type="primary" plain shape="circle" @click="isPickerShow = true"
					class="singleTimerSettingButton">设置计时器</u-button>
			</view>

			<!-- 底部按钮组 -->
			<view class="bottomButtonGruop">
				<navigator url="../../pages/mobile/singleTimerList">
					<view class="button">
						<u-icon name="list-dot" size="50"></u-icon>
					</view>
				</navigator>
				<view class="button" @click="startSingleTimer">
					<u-icon name="play-right-fill" size="50"></u-icon>
				</view>
				<navigator url="../../pages/mobile/setting">
					<view class="button">
						<u-icon name="volume-up-fill" size="50"></u-icon>
					</view>
				</navigator>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			// 时间选择器被确认时候触发的函数
			confirmSingleTimerPicker(e) {
				const time = this.$time.timerPickerResultToSeconds(e)
				if(time === 0){
					this.$u.toast('请设置有效时间')
				} else{
					this.storage.currentSingleTimer = time
					// 把临时单集计时器时间保存到本地存储中
					this.$tools.updateLocalStorage(this.storage)
				}
				
			},
			// 开始单次计时器,跳转到单次计时器页面
			startSingleTimer() {
				// 如果临时单次计时器时间大于0才跳转到单次计时器页面
				if (this.storage.currentSingleTimer > 0) {
					uni.navigateTo({
						url: '../../pages/mobile/singleCountDown'
					})
					// 如果不大于0说明则显示错误提示
				} else {
					this.$u.toast('请先设置计时器')
				}

			}
		},
	}
</script>

<style lang="less" scoped>
	.warningToast {
		font-size: 40rpx;
		width: 400rpx;
	}

	.singleTimer {
		height: 100%;
		padding-top: 50rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 750rpx;

		.timerSetting {
			height: 100rpx;
			width: 750rpx;
			font-size: 120rpx;
			padding-top: 10%;
			display: flex;
			flex-direction: column;
			align-items: center;

			.singleTimerSettingButton {
				margin: 40rpx;
				font-size: 40rpx;
			}
		}

		.bottomButtonGruop {
			width: 750rpx;
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
	}
</style>
