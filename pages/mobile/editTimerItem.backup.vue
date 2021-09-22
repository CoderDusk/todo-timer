<template>
	<!-- 编辑计时器 -->
	<view class="editPage">
		<!-- 页面中不显示的 时间选择器、错误提示 -->
		<u-picker v-model="isPickerShow" mode="time" :params="pickerParams" default-time="00:00:00"
			@confirm="confirmPicker"></u-picker>
		<u-toast ref="toast" />

		<!-- 计时器名称 -->
		<view class="title">计时器名称</view>
		<input type="text" placeholder="请输入计时器名称" class="inputTitle" placeholder-class="placeholder"
			v-model="storage.currentLoopTimer.timerList[index].title">

		<!-- 计时器时长 -->
		<view class="title timerDuration">计时器时长</view>
		<u-button @click="isPickerShow = true" size="medium" type="primary" class="ringtoneButton" plain>
			{{storage.currentLoopTimer.timerList[index].time === 0 ?'请设置计时器':$time.secondsToString(storage.currentLoopTimer.timerList[index].time)}}
		</u-button>

		<!-- 底部按钮组 -->
		<view class="bottomButtonGruop">
			<view class="button" @click="deleteTimerItem">
				<u-icon name="trash" size="50" color="red"></u-icon>
			</view>
			<view class="button" @click="saveTimerItem">
				<u-icon name="checkmark" size="50"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 要编辑的计时器在临时循环计时器组中的索引号
				index: null,
			}
		},
		methods: {
			// 确认时间选择器时触发的函数
			confirmPicker(e) {
				// 把时间选择器传回的结果转换成秒数
				const time = this.$time.timerPickerResultToSeconds(e)
				if (time !== 0) {
					this.storage.currentLoopTimer.timerList[this.index].time = time
				} else {
					this.$u.toast('请设置计时器的时间')
				}

			},
			// 保存计时器
			saveTimerItem() {
				// 如果标题或时间为空,弹出错误提示
				if (this.storage.currentLoopTimer.timerList[this.index].trim = '') {
					this.$u.toast('计时器标题不能为空')
				} else if (this.storage.currentLoopTimer.timerList[this.index].time === 0) {
					this.$u.toast('请设置计时器的时长')
				} else {
					this.updateStorage()
					this.$u.toast('保存成功')
					this.gotoIndexPage('loop')
				}
			},
			// 删除当前计时器
			deleteTimerItem() {
				this.storage.currentLoopTimer.timerList.splice(this.index, 1)
				this.updateStorage()
				this.storage.currentLoopTimer.timerList[this.index] = {}
				this.$u.toast('删除成功')
				this.gotoIndexPage('loop')
			}
		},
		onLoad(e) {
			// 从全局变量中获取当前要编辑的计时器在临时循环计时器组中的索引号
			this.index = Number.parseInt(e.index)
			// 如果索引号为空就返回首页并终止执行
			if (!Number.isInteger(this.index) || this.index < 0) {
				this.$u.toast('参数不正确')
				this.gotoIndexPage('loop')
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		height: 100%;
	}

	.editPage {
		height: 100%;
		display: flex;
		flex-direction: column;
		// justify-content: center;
		align-items: center;
		padding-top: 45%;
	}

	.title {
		font-size: 40rpx;
	}

	.timerDuration {
		margin-top: 50rpx;
	}

	.inputTitle {
		margin: 25rpx 0;
		font-size: 40rpx;
		border-bottom: 1rpx solid black;
		text-align: center;

		// background-color: pink;
		.placeholder {
			// color: green;
			text-align: center;
		}

	}

	.ringtoneButton {
		font-size: 35rpx;
		margin: 30rpx;
	}

	.saveButton {
		border: 1px solid #F1F1F1;
		width: 90rpx;
		height: 90rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		color: rgb(34, 131, 246);
		box-shadow: 0 7rpx 10rpx rgba(0, 0, 0, 0.19);
		margin-top: 150rpx;
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
</style>
