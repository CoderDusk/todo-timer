<template>
	<!-- 新增计时器 -->
	<view class="main">
		
		<view class="panel">
			<!-- 主要界面中不显示的 时间选择器和错误提示框 -->
			<u-picker v-model="isPickerShow" mode="time" :params="pickerParams" default-time="00:00:00"
				@confirm="confirmPicker"></u-picker>

			<!-- 计时器名称 -->
			<view class="title">计时器名称</view>
			<input type="text" placeholder="请输入计时器名称" class="inputTitle" placeholder-class="placeholder"
				v-model="title">

			<!-- 计时器时长 -->
			<view class="title timerDuration">计时器时长</view>
			<u-button @click="isPickerShow = true" size="medium" type="primary" class="ringtoneButton" plain>
				{{time === 0 ?'请设置计时器':$time.secondsToString(time)}}
			</u-button>
		</view>



		<!-- 底部按钮组 -->
		<view class="bottomButtonGruop">
			<view v-if="action ==='add'" class="button" @click="gotoIndexPage('loop')">
				<u-icon name="close" size="50" color="red"></u-icon>
			</view>
			<view v-else-if="action === 'edit'" class="button" @click="deleteTimerItem">
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
				// 操作类型
				action: '',
				// 标题
				title: '',
				// 时间
				time: 0,
			}
		},
		onLoad(e) {
			this.action = e.action
			this.index = Number.parseInt(e.index)
		},
		mounted(){
			this.initData()
		},
		methods: {
			getEditingItem() {
				if (this.storage.currentLoopTimer.timerList[this.index] == null) {
					this.toastThenJumpToIndex('找不到该项', 'loop')
				} else {
					this.title = this.storage.currentLoopTimer.timerList[this.index].title
					this.time = this.storage.currentLoopTimer.timerList[this.index].time
				}
			},
			initData(){
				if (this.action != null && this.action !== '') {
					if (this.action === 'edit') {
						if (Number.isInteger(this.index) && this.index >= 0) {
							this.getEditingItem()
						} else {
							this.toastThenJumpToIndex('index必须是正整数', 'loop')
						}
					}
				} else {
					this.toastThenJumpToIndex('action不能为空', 'loop')
				}
			},
			// 确认时间选择器时触发的函数
			confirmPicker(e) {
				const time = this.$time.timerPickerResultToSeconds(e)
				if (time !== 0) {
					this.time = time
				} else {
					this.$u.toast('计时器时长不能为0')
				}
			},
			// 保存计时器
			saveTimerItem() {
				// 如果标题或者时间为空，弹出错误提示
				if (this.title.trim() === '') {
					this.$u.toast('请设置计时器标题')
					return
				} else if (this.time === 0) {
					this.$u.toast('请设置计时器时长')
					return
				} else {
					if (this.action === 'add') {
						this.storage.currentLoopTimer.timerList.push({
							title: this.title,
							time: this.time,
							id: new Date().getTime()
						})

					} else if (this.action === 'edit') {
						this.storage.currentLoopTimer.timerList[this.index] = {
							title: this.title,
							time: this.time,
							id: new Date().getTime()
						}
					}
					this.updateStorage()
					// 返回首页
					this.toastThenJumpToIndex('保存成功', 'loop')
				}
			},
			// 删除当前计时器
			deleteTimerItem() {
				this.storage.currentLoopTimer.timerList.splice(this.index, 1)
				this.updateStorage()
				// 返回首页
				this.toastThenJumpToIndex('删除成功', 'loop')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		box-sizing: border-box;
		padding-bottom: 40px;
		background-color: white;

		.panel {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;

			.title {
				font-size: 40rpx;
			}

			.timerDuration {
				margin-top: 25px;
			}

			.inputTitle {
				margin: 12px 0;
				font-size: 40rpx;
				border-bottom: 1px solid black;
				text-align: center;

				.placeholder {
					text-align: center;
				}
			}

			.ringtoneButton {
				font-size: 35rpx;
				margin: 15px;
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
				box-shadow: 0 4px 5px rgba(0, 0, 0, 0.19);
				margin-top: 75px;
			}
		}
	}

	.bottomButtonGruop {
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
			box-shadow: 0 4px 5px rgba(0, 0, 0, 0.19);
		}
	}
</style>
