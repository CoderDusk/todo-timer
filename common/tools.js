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
	// console.log(appLocalStorage)
	if (typeof appLocalStorage !== 'object') {
		// uni.setStorageSync('interval_timer_2', defaultData)
		uni.setStorageSync('interval_timer_2', {})
	} else {
		// 如果设置不是一个对象，就把它设置成默认对象
		if (typeof appLocalStorage.setting !== 'object') {
			appLocalStorage.setting = defaultData.setting
		}
		// 如果当前单次计时器不是非负正整数，就把它设置为0
		if (!Number.isInteger(appLocalStorage.currentSingleTimer) || appLocalStorage.currentSingleTimer < 0) {
			appLocalStorage.currentSingleTimer = 0
		}
		if (typeof appLocalStorage.currentLoopTimer !== 'object') {
			appLocalStorage.currentLoopTimer = {}
		}
		if (!Array.isArray(appLocalStorage.savedSingleTimerList)) {
			appLocalStorage.savedSingleTimerList = []
		}
		if (!Array.isArray(appLocalStorage.savedLoopTimerList)) {
			appLocalStorage.savedLoopTimerList = []
		}

		uni.setStorageSync('interval_timer_2', appLocalStorage)
	}

}

export default {
	checkLocalStorage
}
