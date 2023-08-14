<template>
	<!-- 首页 -->
	<view class="main">
		<!-- 标签组 -->
		<view class="tab">
			<!--  #ifdef  APP-PLUS -->
			<view class="padding-for-app">
				<view class="status-bar"></view>
			</view>
			<!--  #endif -->
			<!--  #ifdef  MP-WEIXIN -->
			<!-- 如果是微信小程序，就添加两个空白的区域，用以填充状态栏和胶囊按钮区域 -->
			<view class="padding-for-mp-weixin">
				<view class="status-bar"></view>
				<view class="pill-buttons" :style="{ height: `${pillButtonInfo.height}px` }"></view>
			</view>
			<!--  #endif -->
			<u-tabs-swiper ref=" uTabs" :list="tabName" :current="currentTab" @change="tabsChange" :is-scroll="false"
				:show-bar="false" font-size="45" gutter="10" class="swiperTab">
			</u-tabs-swiper>
		</view>
		<!-- 标签组结束 -->
		<!-- 滑动组件 -->
		<swiper :current="currentTab" @change="swiperChange" class="swiper">

			<!-- 第一个滑动组件页面 单次计时器 -->
			<swiper-item class="swiperPage">
				<view class="main">
					<view></view>
					<SingleTimerPanel class="panel single-timer-panel"></SingleTimerPanel>
					<SingleTimerButtons class="bottom-buttons single-timer-buttons"></SingleTimerButtons>
				</view>
			</swiper-item>
			<!-- 单次计时器结束 -->
			<!-- 循环计时器 -->
			<swiper-item class="swiperPage">
				<view class="main">
					<LoopTimerPanel class="panel loop-timer-panel"></LoopTimerPanel>
					<LoopTimerButtons class="bottom-buttons"></LoopTimerButtons>
				</view>
			</swiper-item>
			<!-- 循环计时器结束 -->
		</swiper>
		<!-- 滑动组件结束 -->
	</view>
</template>
<script>
	import SingleTimerPanel from '../components/SingleTimerPanel.vue'
	import SingleTimerButtons from '../components/SingleTimerButtons.vue'
	import LoopTimerPanel from '../components/LoopTimerPanel.vue'
	import LoopTimerButtons from '../components/LoopTimerButtons.vue'
	export default {
		data() {
			return {
				// 标签相关变量
				// 标签页标题
				tabName: [{
						name: '单次'
					},
					{
						name: '循环'
					}
				],
				// 当前标签
				currentTab: 0,
			}
		},
		components: {
			SingleTimerPanel,
			SingleTimerButtons,
			LoopTimerPanel,
			LoopTimerButtons
		},
		methods: {
			// 标签和滑块内容相关函数
			// 标签切换时触发
			tabsChange(index) {
				this.currentTab = index
			},
			// 滑块容器切换时触发
			swiperChange(e) {
				this.currentTab = e.detail.current
			}
		},
		onLoad(e) {
			if (e.tab === 'single') {
				this.currentTab = 0
			} else if (e.tab === 'loop') {
				this.currentTab = 1
			}
			// #ifdef  MP-WEIXIN
			this.pillButtonInfo = uni.getMenuButtonBoundingClientRect()
			// #endif
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		background-color: white;

		/* #ifdef H5 */
		padding-top: 20px;
		/* #endif */
	}

	.swiper {
		height: 100%;
	}

	.panel {
		align-self: center;
		width: 100%;
	}

	.single-timer-panel {
		margin-top: 40px;
	}

	.bottom-buttons {
		margin-bottom: 40px;
	}
</style>
