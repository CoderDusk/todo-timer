<template>
	<view>
		<!-- 不在主要页面的弹出组件：错误警告框、时间选择器 -->
		<u-toast ref="warningToast" class="warningToast" />
		<u-picker v-model="isPickerShow" mode="time" :params="pickerParams" default-time="00:00:00"
			@confirm="confirmSingleTimerPicker"></u-picker>

		<!-- 单次计时器组件主体 -->
		<view class="singleTimer">
			<!-- 设定计时器 -->
			<view class="timerSetting">
				<view v-model="singleTimerString">{{singleTimerString}}</view>
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
				// 时间选择器是否显示的开关变量
				isPickerShow: false,
				// 时间选择器的参数
				pickerParams: {
					hour: true,
					minute: true,
					second: true
				},
				// 临时单次计时器时间
				tempSingleTimer: 0
			};
		},
		methods: {
			// 时间选择器被确认时候触发的函数
			confirmSingleTimerPicker(e) {
				console.log(e)
				// 把时间选择传来的结果转换成描述保存到临时单次计时器变量里
				this.tempSingleTimer = this.mytime.timeToSeconds(e.hour, e.minute, e.second)
				// 把临时单集计时器时间保存到本地存储中
				uni.setStorage({
					key: 'tempSingleTimer',
					data: this.tempSingleTimer
				})
			},
			// 开始单次计时器,跳转到单次计时器页面
			startSingleTimer() {
				// 如果临时单次计时器时间大于0才跳转到单次计时器页面
				if (this.tempSingleTimer > 0) {
					uni.navigateTo({
						url: '../../pages/mobile/singleCountDown'
					})
					// 如果不大于0说明则显示错误提示
				} else {
					this.$refs.warningToast.show({
						title: '请先设置计时器',
						type: 'error',
						position: 'top'
					})
				}

			}
		},
		computed: {
			// 界面上显示的单次计时器字符串
			singleTimerString: function() {
				// 通过自定义的mytime中的函数把秒数转换成时间字符串
				return this.mytime.secondsToString(this.tempSingleTimer)
			}
		},
		// 加载组件的时候从本地存储中读取并更新单次计时器
		activated() {
			this.tempSingleTimer = uni.getStorageSync('tempSingleTimer')
		},
		created(){
			this.tempSingleTimer = uni.getStorageSync('tempSingleTimer')
		}
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
