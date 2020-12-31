<script>
	export default {
		globalData:{
			currentTimer:{},
			currentEditTimerItem:null
		},
		
		// 当uni-app 初始化完成时触发（全局只触发一次）
		onLaunch: function() {
			// console.log('App Launch')
			// 以同步方式获取本地存储中 key 为 setting 的值
			let setting = uni.getStorageSync('setting')
			// 如果 setting 为空，就设置一个初始值
			if(setting == ''){
				uni.setStorage({
					key:'setting',
					data:{
						volume:60,
						ringtone:0
					}
				})
			}
			
			// 以同步方式获取本地存储中的临时循环计数器组，如果不存在就设定一个初始值
			let tempLoopTimerGroup = uni.getStorageSync('tempLoopTimerGroup')
			if(tempLoopTimerGroup == ''){
				uni.setStorage({
					key:'tempLoopTimerGroup',
					data:{
						timerList:[],
						count:1
					}
				})
			}
			
			let loopTimerGroupList = uni.getStorageSync('loopTimerGroupList')
			if(loopTimerGroupList == ''){
				uni.setStorage({
					key:'loopTimerGroupList',
					data:[]
				})
			}
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/theme.scss";
	/*每个页面公共css */
</style>
