<!-- 设置页面 -->
<template>
	<view class="main">
		<view class="panel">
			<!-- 音量设置 -->
			<view class="title">{{$t('setting.volumeSetting')}}</view>
			<u-slider v-model="storage.setting.ringtoneVolume" class="volumeSlider" @end="volumeSliderEnd"></u-slider>
			<!-- 铃声设置 -->
			<view class="title">{{$t('setting.ringtoneSetting')}}</view>
			<u-select v-model="showRingtoneSetting" :list="ringtoneList" @confirm="confirmRingtone"></u-select>
			<u-button @click="showRingtoneSetting = true" size="medium" type="primary" class="select-button"
				plain>{{storage.setting.ringtoneName}}</u-button>
			<view class="title">{{$t('setting.cycleTimerSwitchMethod')}}</view>
			<u-select v-model="isShowTimerSwitchTypeSelect" :list="timerSwitchTypeOptions"
				@confirm="confirmTimerSwitchType"></u-select>
			<u-button @click="isShowTimerSwitchTypeSelect = true" size="medium" type="primary" class="select-button"
				plain>{{storage.setting.timerSwitchTypeTitle}}</u-button>
		</view>

		<!-- 保存按钮 -->
		<view class="save-button" @click="saveSetting">
			<u-icon name="checkmark" size="50"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 是否显示铃声选择
				showRingtoneSetting: false,
				// 铃声列表
				ringtoneList: [],
				// 来自哪个页面
				from: '',
				isShowTimerSwitchTypeSelect: false,
				timerSwitchTypeOptions: [{
						value: 'auto',
						label: this.$t('setting.switchType.auto')
					},
					{
						value: 'manual',
						label: this.$t('setting.switchType.manual')
					}
				],
			}
		},
		methods: {
			// 保存设置
			saveSetting() {
				// 更新本地存储中的设置
				this.updateStorage()
				// 停止铃声
				this.ringtoneAudio.stop()
				// 返回首页
				this.toastThenJumpToIndex(this.$t('system.saveSuccess'), this.from)
			},
			// 确认铃声选择
			confirmRingtone(e) {
				// 更新铃声音频对象的音频文件
				this.storage.setting.ringtoneFileUrl = e[0].value
				this.storage.setting.ringtoneName = e[0].label
				this.updateStorage()
				// 试听铃声
				this.createRingtoneAudio()
				this.ringtoneAudio.play()
			},
			// 确认计时器切换方式选择
			confirmTimerSwitchType(e) {
				this.storage.setting.timerSwitchTypeTitle = e[0].label
				this.storage.setting.timerSwitchType = e[0].value
				this.updateStorage()
			},
			// 音量滑块滑动停止时触发的函数
			volumeSliderEnd() {
				// 设置铃声音频对象的音量大小
				this.ringtoneAudio.volume = this.storage.setting.ringtoneVolume / 100
				// 如果音频没有在播放，就开始试听播放
				if (this.ringtoneAudio.paused) {
					this.ringtoneAudio.play()
				}
			},
			generateRingtoneList() {
				// 内置铃声列表
				const innerRingtoneList = [{
						value: '/static/ringtone/ding.mp3',
						label: this.$t('setting.ringtone.ding')
					},
					{
						value: '/static/ringtone/bird.mp3',
						label: this.$t('setting.ringtone.bird')
					},
					{
						value: '/static/ringtone/clock.mp3',
						label: this.$t('setting.ringtone.clock')
					},
					{
						value: '/static/ringtone/gugu.mp3',
						label: this.$t('setting.ringtone.gugu')
					},
				]
				// 后期与自定义铃声合并
				this.ringtoneList = innerRingtoneList
			},
		},
		created() {
			// 创建铃声音频对象
			this.createRingtoneAudio()
			// 生成铃声列表
			this.generateRingtoneList()
		},
		onLoad(e) {
			this.from = e.from
		},
	}
</script>

<style lang="scss" scoped>
	.main {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		background-color: white;
	}

	.panel {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		.title {
			font-size: 40rpx;
			margin-top: 20px;
		}

		.volumeSlider {
			width: 70%;
			margin-top: 20px;
			margin-bottom: 30px;
		}

		.select-button {
			font-size: 35rpx;
			margin: 15px;
		}
	}

	.save-button {
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
</style>