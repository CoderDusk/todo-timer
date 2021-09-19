function checkLocalStorage() {
	const defaultData = {
		setting: {
			ringtoneVolume: 30,
			ringtoneFileUrl: ''
		},
		currentSingleTimer: 0,
		currentLoopTimer: {},
		savedSingleTimerList: [],
		savedLoopTimerList: []
	}

	let appLocalStorage = uni.getStorageSync('interval_timer_2')
	if (typeof appLocalStorage !== 'object') {
		uni.setStorageSync('interval_timer_2', defaultData)
	} else {
		// 如果设置不是一个对象，就把它设置成默认对象
		if (typeof appLocalStorage.setting !== 'object') {
			appLocalStorage.setting = defaultData.setting
		}
		// 如果当前单次计时器不是非负正整数，就把它设置为0
		if (!Number.isInteger(appLocalStorage.currentSingleTimer) || appLocalStorage.currentSingleTimer < 0) {
			appLocalStorage.currentSingleTimer = 0
		}
		// 如果当前循环计时器不是一个对象，就把它设置成空对象
		if (typeof appLocalStorage.currentLoopTimer !== 'object') {
			appLocalStorage.currentLoopTimer = {}
		}
		// 如果已保存单次计时器列表不是一个数组，就把它设置成一个空数组
		if (!Array.isArray(appLocalStorage.savedSingleTimerList)) {
			appLocalStorage.savedSingleTimerList = []
		}
		// 如果已保存循环计时器列表不是一个数组，就把它设置成一个空数组
		if (!Array.isArray(appLocalStorage.savedLoopTimerList)) {
			appLocalStorage.savedLoopTimerList = []
		}
		// 把经过处理过的对象保存到本地存储中
		uni.setStorageSync('interval_timer_2', appLocalStorage)
	}

}

function getLocalStorage(){
	const result = uni.getStorageSync('interval_timer_2')
	return result
}

function updateLocalStorage(value){
	uni.setStorageSync('interval_timer_2',value)
}

export default {
	checkLocalStorage,
	getLocalStorage,
	updateLocalStorage,
}
