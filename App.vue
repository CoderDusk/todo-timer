<script>
	export default {
		globalData:{
			// 当前要编辑的项目在临时循环计时器组中的索引号
			currentEditTimerItem:null,
			// 首页里tab序号
			currentTab:0
		},
		
		// 当uni-app 初始化完成时触发（全局只触发一次）
		onLaunch: function() {
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
			
			// 以同步方式获取本地存储中的循环计数器组列表，如果不存在就设定一个初始值
			let loopTimerGroupList = uni.getStorageSync('loopTimerGroupList')
			if(loopTimerGroupList == ''){
				uni.setStorage({
					key:'loopTimerGroupList',
					data:[]
				})
			}
			
			// 铃声列表
			uni.setStorage({
				key:'ringtoneList',
				data:[
					{
					value: 0,
					label: 'ding'
					}, 
					{
					value: 1,
					label: 'gugu'
					},
					{
					value: 2,
					label: 'clock'
					},
					{
					value:3,
					label: 'bird'
					}
				]
			})
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/theme.scss";
	/*每个页面公共css */
</style>
