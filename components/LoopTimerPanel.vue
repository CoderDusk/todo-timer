<template>
	<view>
		<!-- 不在主要页面的弹出组件：错误警告框、输入计时器名称的模态框 -->
		<u-modal v-model="isShowSaveModal" :show-title="false" :show-cancel-button="true" @confirm="saveTimerGroup">
			<input type="text" placeholder="请输入计时器名称" class="inputTitle" placeholder-class="placeholder"
				v-model="storage.currentLoopTimer.title">
		</u-modal>

		<!-- 循环计时器组件主体 -->
		<view class="main">

			<!-- 循环计时器组为空的提示 -->
			<view @click="addTimerItem()" v-if="storage.currentLoopTimer.timerList == 0" class="no-list-tip">
				<text>循环计时器组为空，请按</text>
				<view class="button timerButton add-item-button">
					<u-icon name="plus" size="33" color="white"></u-icon>
				</view>
				<text>添加第一个计时器</text>
			</view>

			<!-- 计时器列表 -->
			<scroll-view scroll-y class="timerList">
				<view class="loopTimerBox" v-for="(item,index) in storage.currentLoopTimer.timerList" :key="item.id"
					@click="gotoEditPage(index)" @longpress="deleteItem(index)">
					<view class="loopTimerTitle">
						{{item.title}}
					</view>
					<view class="loopTimerTime">
						{{$time.secondsToString(item.time)}}
					</view>
				</view>
			</scroll-view>

			<!-- 循环次数 -->
			<view class="count">
				<text>循环次数</text>
				<u-number-box v-model="storage.currentLoopTimer.cycleTimes" :min="1" @change="countChange">
				</u-number-box>
			</view>

			<!-- 计时器列表按钮组 -->
			<view class="buttonGroup">
				<view class="button timerButton" @click="showSaveModal">
					<u-icon name="download" size="50" color="white"></u-icon>
				</view>
				<navigator url="/pages/editTimerItem?action=add">
					<view class="button timerButton">
						<u-icon name="plus" size="50" color="white"></u-icon>
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
				// 是否显示保存计时器组模态框的开关变量
				isShowSaveModal: false,
				// 计时器组标题
				groupTitle: '',
			};
		},
		methods: {
			// 显示保存计时器组模态框
			showSaveModal() {
				// 如果计时器组为空则弹出错误提示并返回
				if (this.storage.currentLoopTimer.timerList.length === 0) {
					this.$u.toast('计时器列表不能为空')
					return
				} else {
					// 如果检查没有错误则弹出保存模态框
					this.isShowSaveModal = true
				}
			},
			// 前往编辑计时器页面,并且把当前要编辑项目的索引号保存到全局变量中
			gotoEditPage(index) {
				uni.navigateTo({
					url: `editTimerItem?action=edit&index=${index}`
				})
			},
			addTimerItem(){
				uni.navigateTo({
					url:'editTimerItem?action=add'
				})
			},
			deleteItem(index) {
				uni.showModal({
					title: '提示',
					content: '确认要删除这个计时器吗？',
					success: (res) => {
						if (res.confirm) {
							this.storage.currentLoopTimer.timerList.splice(index, 1)
							this.updateStorage()
						}
					}
				})

			},
			// 保存计时器组
			saveTimerGroup() {
				// 如果计时器组标题为空,弹出错误警告
				if (this.storage.currentLoopTimer.title.trim() == '') {
					this.$u.toast('请输入计时器名称')
				} else if (this.storage.currentLoopTimer.timerList.length === 0) {
					this.$u.toast('计时器列表不能为空')
				} else if (this.storage.currentLoopTimer.cycleTimes <= 0) {
					this.$u.toast('循环次数请设置为正整数')
				} else {
					this.storage.savedLoopTimerList.push({
						title: this.storage.currentLoopTimer.title,
						list: this.storage.currentLoopTimer.timerList,
						count: this.storage.currentLoopTimer.cycleTimes,
						id: new Date().getTime()
					})
					// 把循环计时器组标题变量重新设置为空
					this.storage.currentLoopTimer.title = ''
					// 把新的循环计时器组列表保存到本地存储
					this.updateStorage()
				}
			},

			// 当循环次数变更时触发的函数
			countChange(e) {
				// 把当前值更新到循环计时器组的循环次数
				this.storage.currentLoopTimer.cycleTimes = e.value
				// 把新的数值保存到本地存储里
				this.updateStorage()
			}
		},
	}
</script>

<style lang="scss" scoped>
	.main {
		height: 100%;
		padding-top: 25px;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;

		.no-list-tip {
			border: dashed gray;
			width: 75%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			font-size: 32rpx;
			padding: 30rpx 0;

			.button {
				width: 45rpx;
				height: 45rpx;
				box-shadow: none;
				margin: 20rpx 0;
			}
		}

		.timerList {
			height: 50%;

			.loopTimerBox {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 90%;
				height: 50px;
				margin: 0 50rpx 40rpx 50rpx;
				box-shadow: 0 7rpx 10rpx rgba(0, 0, 0, 0.19);
				font-size: 40rpx;
				padding: 0 25px;
				box-sizing: border-box;
			}
		}

		.count {
			font-size: 35rpx;
			font-weight: bold;
			display: flex;
			justify-content: space-around;
			width: 100%;
			margin-top: 20px;
		}

		.buttonGroup {
			display: flex;
			width: 75%;
			justify-content: space-around;
			margin-top: 25px;

			.button {
				box-shadow: none;

				.saveIcon {
					width: 50rpx;
					height: 50rpx;
				}
			}
		}


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

	.timerButton {
		background-color: rgb(34, 131, 246);
	}

	.inputTitle {
		margin: 25px auto;
		font-size: 40rpx;
		border-bottom: 2px solid black;
		text-align: center;
		width: 60%;

		.placeholder {
			text-align: center;
		}

	}
	
	scroll-view ::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: transparent;
	}
</style>
