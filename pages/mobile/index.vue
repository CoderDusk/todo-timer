<template>
	<!-- 首页 -->
	<view class="content">
		<!-- 标签组 -->
		<view class="tab">
			<u-tabs-swiper ref="uTabs" :list="tabName" :current="currentTab" @change="tabsChange" :is-scroll="false" :show-bar="false" font-size="45" gutter="10" class="swiperTab"></u-tabs-swiper>
		</view>
		<!-- 标签组结束 -->
		<!-- 滑动组件 -->
		<swiper :current="currentTab" @change="swiperChange" class="swiper">
			<!-- 第一个滑动组件页面 单次计时器 -->
			<swiper-item class="swiperPage">
				<singleTimer></singleTimer>
			</swiper-item>
			<!-- 单次计时器结束 -->
			<!-- 循环计时器 -->
			<swiper-item class="swiperPage">
				<loopTimer></loopTimer>
			</swiper-item>
			<!-- 循环计时器结束 -->
		</swiper>
		<!-- 滑动组件结束 -->
	</view>
</template>



<script>

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
			if(e.tab === 'single'){
				this.currentTab = 0
			}else if (e.tab === 'loop'){
				this.currentTab = 1
			}
		}
	}
</script>

<style lang="scss">
	page,
	.content {
		height: 100%;
	}

	.tab {
		height: 10%;
		padding-top: 30rpx;

		.swiperTab {
			padding-top: 50rpx;
		}
	}

	.swiper {
		height: 90%;
		.swiperPage {
			display: flex;
			flex-direction: column;
			align-items: center;
			box-sizing: content-box;
		}
	}
</style>
