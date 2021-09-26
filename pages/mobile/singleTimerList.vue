<template>
	<view style="height: 100%;">
		<!-- 不在页面上显示的组件 -->
		<!-- 时间选择器 -->
		<u-picker v-model="isPickerShow" mode="time" :params="pickerParams" default-time="00:00:00"
			@confirm="confirmPicker"></u-picker>
		<!-- 已保存的单次计时器列表页面 -->
		<view class="main">
			<!-- 计时器列表 -->
			<view class="timer-list">
				<view v-if="storage.savedSingleTimerList.length === 0">
					<u-empty text="没有已保存的单次计时器"></u-empty>
				</view>
				<scroll-view v-else scroll-y>
					<view class="timer" v-for="(item,index) in storage.savedSingleTimerList" :key="index"
						@click="chooseTimer(item)">
						<text class="time">{{$time.secondsToString(item)}}</text>
						<span @click.stop="remove(index)">
							<u-icon name="trash" color="red" size="40" class="deleteIcon"></u-icon>
						</span>
					</view>
				</scroll-view>
			</view>
			<!-- 底部按钮组 -->
			<view class="buttonGroup">
				<view class="button" @click="isPickerShow = true">
					<u-icon name="plus" size="50"></u-icon>
				</view>
				<navigator url="index">
					<view class="button">
						<u-icon name="checkmark" size="50"></u-icon>
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
				// 是否显示时间选择器
				isPickerShow: false,
				// 时间选择器参数
				pickerParams: {
					hour: true,
					minute: true,
					second: true
				},
			}
		},
		methods: {
			// 确认时间选择器时触发的函数
			confirmPicker(e) {
				const time = this.$time.timerPickerResultToSeconds(e)
				// 如果返回的时间不为空进行接下来的流程
				if (time !== 0) {
					// 把新计时器追加到计时器列表
					this.storage.savedSingleTimerList.push(time)
					// 去重
					this.storage.savedSingleTimerList = Array.from(new Set(this.storage.savedSingleTimerList))
					// 排序
					this.storage.savedSingleTimerList = this.storage.savedSingleTimerList.sort((a, b) => {
						return a - b
					})
					// 把新计时器保存到本地存储
					this.updateStorage()
				} else {
					this.$u.toast('请设置正确的时长')
				}
			},
			// 删除计时器
			remove(index) {
				this.storage.savedSingleTimerList.splice(index, 1)
				this.updateStorage()
				this.toastThenJumpToIndex('删除成功')
			},
			// 选择计时器并将其设置为临时单次计时器
			chooseTimer(time) {
				this.storage.currentSingleTimer = time
				this.updateStorage()
				this.toastThenJumpToIndex('设置成功')
			}
		},
	}
</script>

<style lang="less" scoped>
	.main {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		box-sizing: border-box;
	}

	.timer-list {
		width: 85%;

		.timer {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 50px;
			margin: 15px;
			box-shadow: 0 3px 5px rgba(0, 0, 0, 0.19);

			.time {
				padding-left: 80rpx;
				font-size: 40rpx;
				font-weight: bold;
			}

			.deleteIcon {
				padding-right: 50rpx;
			}
		}
	}



	.buttonGroup {
		width: 100%;
		display: flex;
		justify-content: space-around;
		// margin-top: 150rpx;

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
