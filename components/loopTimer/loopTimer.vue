<template>
	<view>
		<!-- 修改测试 -->
		<!-- <u-top-tips ref="noTitleError"></u-top-tips>
		<u-top-tips ref="noTimerListError"></u-top-tips> -->
		<u-toast ref="warningToast" class="warningToast" />
		
		<view class="loopTimer">


			<view v-if="tempLoopTimerGroup.timerList.length == 0" class="noListTip">
				<text>循环计时器组为空，请按</text>
				<view class="button timerButton" @click="gotoAddTimerItemPage">
					<u-icon name="plus" size="27" color="white"></u-icon>
				</view>
				<text >添加第一个计时器</text>
			</view>

			<scroll-view scroll-y="true" class="timerList">
				
				<view class="loopTimerBox shadow" v-for="(item,index) in tempLoopTimerGroup.timerList" :key="index" @click="gotoEditPage(index)">
					<view class="loopTimerTitle">
						{{item.title}}
					</view>
					<view class="loopTimerTime">
						{{item.showtime}}
					</view>
				</view>
			</scroll-view>


			<!-- <view class="button plusLoopTimerButton">
				<u-icon name="plus" size="50"></u-icon>
			</view> -->

			<u-modal v-model="isShowSaveModal" :show-title="false" :show-cancel-button="true" @confirm="saveTimerGroup">
				<input type="text" placeholder="请输入计时器名称" class="inputTitle" placeholder-class="placeholder" v-model="groupTitle">
				<!-- <u-line color="gray" /> -->
			</u-modal>
			
			<view class="count">
				<text>循环次数</text>
				<u-number-box v-model="tempLoopTimerGroup.count" :min="1" @change="countChange"></u-number-box>
			</view>

			<view class="buttonGroup">
				<view class="button timerButton" @click="showSaveModal">
					<svg t="1608343189572" class="saveIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
					 p-id="3723" data-spm-anchor-id="a313x.7781069.0.i0">
						<path d="M262.00000039 186.9999998a74.99999971 74.99999971 0 0 0-75.00000058 75.00000059v499.99999922a74.99999971 74.99999971 0 0 0 75.00000058 75.00000058h499.99999922a74.99999971 74.99999971 0 0 0 75.00000058-75.00000058V262.00000039a74.99999971 74.99999971 0 0 0-75.00000058-75.00000058H262.00000039z m0-50.00000009h499.99999922a124.9999998 124.9999998 0 0 1 125.00000068 125.00000068v499.99999922a124.9999998 124.9999998 0 0 1-125.00000068 125.00000068H262.00000039a124.9999998 124.9999998 0 0 1-125.00000068-125.00000068V262.00000039a124.9999998 124.9999998 0 0 1 125.00000068-125.00000068z"
						 fill="white" p-id="3724"></path>
						<path d="M311.99999961 186.9999998v225h400.00000078V186.9999998h49.99999922v232.7000001c0 23.3499999-22.37500019 42.3-49.99999922 42.3H311.99999961c-27.6249999 0-50.0000001-18.9500001-49.99999922-42.3V186.9999998h49.99999922z"
						 fill="white" p-id="3725"></path>
						<path d="M612.0000002 236.9999999m24.99999961 0l0 0q24.99999961 0 25.00000048 25.00000049l0 74.99999971q0 24.99999961-25.00000048 24.99999961l0 0q-24.99999961 0-24.99999961-24.99999961l0-74.99999971q0-24.99999961 24.99999961-25.00000049Z"
						 fill="white" p-id="3726"></path>
					</svg>
				</view>
				<view class="button timerButton" @click="gotoAddTimerItemPage">
					<u-icon name="plus" size="50" color="white"></u-icon>
				</view>
			</view>

			<view class="bottomButtonGruop">

				<navigator url="../../pages/mobile/loopTimerGroupList">
					<view class="button">
						<u-icon name="list-dot" size="50"></u-icon>
					</view>
				</navigator>

				<view class="button" @click="startLoopTimer">
					<u-icon name="play-right-fill" size="50"></u-icon>
				</view>

				<view class="button" @click="gotoSettingPage">
					<u-icon name="volume-up-fill" size="50"></u-icon>
				</view>
			</view>
		</view>
		<!-- <view class="bottomButtonGruop">
			<view class="button">
				<u-icon name="play-right-fill" size="50"></u-icon>
			</view>
			<view class="button">
				<u-icon name="list-dot" size="50"></u-icon>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 循环计时器相关变量开始
				// 循环计时器是否开启
				isLoopTimerStarting: false,

				// 循环计时器次数
				loopTimerCount: 0,
				
				tempLoopTimerGroup: {},
				isShowSaveModal: false,
				groupTitle: '',
				count:1
			};
		},
		methods: {
			showSaveModal(){
				if(this.tempLoopTimerGroup.timerList.length == 0){
					
					this.$refs.warningToast.show({
						title:'计时器组至少需要一个计时器',
						type:'error',
						position:'top',
						icon:false
					})
					
					return
				}
				
				this.isShowSaveModal = true
			},
			gotoSettingPage() {
				uni.navigateTo({
					url: '../../pages/mobile/setting'
				})
			},
			gotoEditPage(index) {
				getApp().globalData.currentEditTimerItem = index
				uni.navigateTo({
					url: '../../pages/mobile/editTimerItem'
				})
			},
			gotoAddTimerItemPage() {
				uni.navigateTo({
					url: '../../pages/mobile/addTimerItem'
				})
			},
			saveTimerGroup() {
				// if(this.tempLoopTimerGroup.timerList.length == 0){
					
				// 	this.$refs.warningToast.show({
				// 		title:'计时器组至少需要一个计时器',
				// 		type:'error',
				// 		position:'top',
				// 		icon:false
				// 	})
					
				// 	return
				// }
				
				if(this.groupTitle.trim() == ''){
					
					this.$refs.warningToast.show({
						title:'请输入计时器组的标题',
						type:'error',
						position:'top'
					})
				}else{
					let loopTimerGroupList = uni.getStorageSync('loopTimerGroupList')
					
					loopTimerGroupList.push({
						title: this.groupTitle,
						timerGroup: this.tempLoopTimerGroup.timerList,
						count:this.tempLoopTimerGroup.count
					})
					
					uni.setStorage({
						key: 'loopTimerGroupList',
						data: loopTimerGroupList
					})
					
					this.groupTitle = ''
				}
			},
			startLoopTimer(){
				
				if(this.tempLoopTimerGroup.timerList.length == 0){
					
					this.$refs.warningToast.show({
						title:'计时器组至少需要一个计时器',
						type:'error',
						position:'top',
						icon:false
					})
				}
				
				// getApp().globalData.currentTimer = {
				// 	type:'loopTimer',
				// 	timerList:this.tempLoopTimerGroup.timerList,
				// 	count:this.tempLoopTimerGroup.count
				// }
				// uni.navigateTo({
				// 	url:'../../pages/mobile/loopCountDown'
				// })
			},
			countChange(e){
				this.tempLoopTimerGroup.count = e.value
				uni.setStorage({
					key:'tempLoopTimerGroup',
					data:this.tempLoopTimerGroup
				})
			}
		},
		activated() {
			this.tempLoopTimerGroup = uni.getStorageSync('tempLoopTimerGroup')
			
		},
		created() {
			this.tempLoopTimerGroup = uni.getStorageSync('tempLoopTimerGroup')
		}
	}
</script>

<style lang="less" scoped>

	.warningToast{
		font-size: 40rpx;
		width: 400rpx;
	}

	.loopTimer {
		height: 100%;
		padding-top: 50rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 750rpx;
		
		.loopTimerBox {
			// background-color: pink;
			
			display: flex;
			// flex-direction: column;
			align-items: center;
			justify-content: space-between;
			width: 750rpx;
			height: 100rpx;
			// box-shadow: 0 7rpx 10rpx rgba(0, 0, 0, 0.19);
			// border-bottom: 4rpx solid rgba(0, 0, 0, 0.03);
			// box-shadow: 10rpx 10rpx 10rpx pink;
			// background-color: pink;
			// margin-bottom: 20rpx;
			font-weight: bold;
			// border-top: 3rpx solid gray;
			border-bottom: 3rpx solid gray;
			
			::last-of-type{
				border: 0;
				background-color: pink;
			}
			

			.loopTimerTitle {
				padding-left: 50rpx;
			}

			.loopTimerTime {
				padding-right: 50rpx;
			}
		}
		
		.loopTimerBox:last-child{
			border: 0;
		}

		.plusLoopTimerButton {
			margin-top: 70rpx;
		}
	}

	.bottomButtonGruop {
		width: 750rpx;
		bottom: 10%;
		position: absolute;
		display: flex;
		justify-content: space-around;


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

	.saveIcon {
		width: 50rpx;
		height: 50rpx;
		// color: rgb(34,131,246);
	}

	.buttonGroup {
		display: flex;
		width: 75%;
		justify-content: space-around;
		margin-top: 60rpx;
		.button{
			box-shadow: none;
		}
	}

	.timerButton {
		background-color: rgb(34, 131, 246);
	}

	.timerList {
		height: 50%;
	}

	.inputTitle {
		margin: 45rpx auto;
		font-size: 40rpx;
		border-bottom: 4rpx solid black;
		text-align: center;
		width: 60%;

		// background-color: pink;
		.placeholder {
			// color: green;
			text-align: center;
		}

	}
	
	.count{
		font-size: 35rpx;
		font-weight: bold;
		display: flex;
		justify-content: space-around;
		width: 100%;
		margin-top: 30rpx;
	}
	
	// .shadow{
	// 	box-shadow: 0 7rpx 10rpx rgba(0, 0, 0, 0.19);
	// }
	
	.noListTip{
		// background-color: pink;
		border: dashed gray;
		width: 75%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex-wrap:wrap;
		font-size: 32rpx;
		padding: 30rpx 0;
		
		.button{
			width:45rpx;
			height: 45rpx;
			// font-size: 20rpx;
			box-shadow: none;
			margin: 20rpx 0;
		}
	}
</style>
