<script>
	export default {
		globalData:{
			// 当前要编辑的项目在临时循环计时器组中的索引号
			currentEditTimerItem:null,
			// 首页里tab序号
			currentTab:0,
		},
		
		// 当uni-app 初始化完成时触发（全局只触发一次）
		onLaunch: function() {
			this.$tools.checkLocalStorage()
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/theme.scss";
	/*每个页面公共css */
</style>
