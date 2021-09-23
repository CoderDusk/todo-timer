<script>
	export default {
		globalData: {},

		// 当uni-app 初始化完成时触发（全局只触发一次）
		onLaunch: function() {
			this.$tools.checkLocalStorage()
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/theme.scss";
	/*每个页面公共css */
	page{
		// background-color: pink;
		width: 750rpx;
		height: 100%;
	}
</style>
