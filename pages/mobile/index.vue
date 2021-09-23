<template>
	<!-- 首页 -->
	<view class="main">
		<!-- 滑动组件 -->
		<swiper :current="currentTab" @change="swiperChange" class="swiper">
			<!-- 第一个滑动组件页面 单次计时器 -->
			<swiper-item class="swiperPage">
				<view class="main">
					<!-- 标签组 -->
					<view class="tab">
						<u-tabs-swiper ref="uTabs" :list="tabName" :current="currentTab" @change="tabsChange"
							:is-scroll="false" :show-bar="false" font-size="45" gutter="10" class="swiperTab">
						</u-tabs-swiper>
					</view>
					<!-- 标签组结束 -->
					<SingleTimerPanel class="panel"></SingleTimerPanel>
					<SingleTimerButtons class="bottom-buttons"></SingleTimerButtons>
				</view>
			</swiper-item>
			<!-- 单次计时器结束 -->
			<!-- 循环计时器 -->
			<swiper-item class="swiperPage">
				<view class="main">
					<!-- 标签组 -->
					<u-tabs-swiper ref="uTabs" :list="tabName" :current="currentTab" @change="tabsChange" :is-scroll="false"
						:show-bar="false" font-size="45" gutter="10" class="swiperTab">
					</u-tabs-swiper>
					<!-- 标签组结束 -->
					<LoopTimerPanel class="panel"></LoopTimerPanel>
					<LoopTimerButtons class="bottom-buttons"></LoopTimerButtons>
				</view>
			</swiper-item>
			<!-- 循环计时器结束 -->
		</swiper>
		<!-- 滑动组件结束 -->
	</view>
</template>
<script>
	import SingleTimerPanel from '../../components/SingleTimerPanel.vue'
	import SingleTimerButtons from '../../components/SingleTimerButtons.vue'
	import LoopTimerPanel from '../../components/LoopTimerPanel.vue'
	import LoopTimerButtons from '../../components/LoopTimerButtons.vue'
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
		padding: 15px 0 25px 0;
	}

	.panel {
		align-self: center;
	}

	.swiper {
		height: 100%;
	}
</style>
