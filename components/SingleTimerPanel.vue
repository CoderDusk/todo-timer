<template>
	<view>
		<!-- 不在主要页面的弹出组件：错误警告框、时间选择器 -->
		<u-picker v-model="isPickerShow" mode="time" :params="pickerParams" default-time="00:00:00"
			@confirm="confirmSingleTimerPicker" :confirm-text="$t('system.confirm')"
			:cancel-text="$t('system.cancel')"></u-picker>

		<!-- 单次计时器组件主体 -->
		<view class="main">
			<!-- 设定计时器 -->
			<view class="time" @click="isPickerShow = true">{{$time.secondsToString(storage.currentSingleTimer)}}</view>
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
				if (time === 0) {
					this.$u.toast(this.$t('index.single.noValidTimer'))
				} else {
					this.storage.currentSingleTimer = time
					// 把临时单集计时器时间保存到本地存储中
					this.$tools.updateLocalStorage(this.storage)
				}

			},

		},
	}
</script>

<style lang="scss" scoped>
	.main {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		.time {
			font-size: 120rpx;
		}

		.button {
			margin: 20px;
			font-size: 40rpx;
		}
	}
</style>