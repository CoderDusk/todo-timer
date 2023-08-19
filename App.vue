<script>
	export default {
		globalData: {},

		// 当uni-app 初始化完成时触发（全局只触发一次）
		onLaunch: function() {
			this.$tools.checkLocalStorage()
			let lan = 'zh'
			try {
				const res = uni.getSystemInfoSync();
				lan = res.language
			} catch (e) {
				console.log('error=' + e)
			}
			if (lan.startsWith('zh')) {
				this.$i18n.locale = 'zh-CN'
			} else {
				this.$i18n.locale = 'en'
			}
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/theme.scss";

	/*每个页面公共css */
	page {
		background-color: #f5f5f5;
		width: 100%;
		height: 100%;
		max-width: 480px;
		margin: 0 auto;
	}

	.status-bar {
		height: var(--status-bar-height);
	}
</style>