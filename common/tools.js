function checkLocalStorage() {
	const defaultData = {
		setting: {
			ringtoneVolume: 30,
			ringtoneFileUrl: "/static/ringtone/ding.mp3",
			timerSwitchType: "auto",
			language: "auto",
			ringtone: "ding"
		},
		currentSingleTimer: 0,
		currentLoopTimer: {
			cycleTimes: 0,
			timerList: [],
		},
		savedSingleTimerList: [],
		savedLoopTimerList: [],
	};

	let appLocalStorage = uni.getStorageSync("todo-timer");
	if (typeof appLocalStorage.setting !== "object") {
		uni.setStorageSync("todo-timer", defaultData);
	} else {
		// 如果设置不是一个对象，就把它设置成默认对象
		if (typeof appLocalStorage.setting !== "object") {
			appLocalStorage.setting = defaultData.setting;
		} else {
			// 如果设置中铃声音文件地址为空就设置默认一个铃声
			if (
				appLocalStorage.setting.ringtoneFileUrl == null ||
				appLocalStorage.setting.ringtoneFileUrl.trim() === ""
			) {
				appLocalStorage.setting.ringtoneFileUrl =
					defaultData.setting.ringtoneFileUrl;
			}
		}

		// 如果当前单次计时器不是非负正整数，就把它设置为0
		if (
			!Number.isInteger(appLocalStorage.currentSingleTimer) ||
			appLocalStorage.currentSingleTimer < 0
		) {
			appLocalStorage.currentSingleTimer = 0;
		}
		// 如果当前循环计时器不是一个对象，就把它设置成空对象
		if (typeof appLocalStorage.currentLoopTimer !== "object") {
			appLocalStorage.currentLoopTimer = {};
		} else {
			if (!Number.isInteger(appLocalStorage.currentLoopTimer.cycleTimes)) {
				appLocalStorage.currentLoopTimer.cycleTimes = 1;
			}
			if (!Array.isArray(appLocalStorage.currentLoopTimer.timerList)) {
				appLocalStorage.currentLoopTimer.timerList = [];
			}
			if (typeof appLocalStorage.currentLoopTimer.title !== "string") {
				appLocalStorage.currentLoopTimer.title = "";
			}
		}
		// 如果已保存单次计时器列表不是一个数组，就把它设置成一个空数组
		if (!Array.isArray(appLocalStorage.savedSingleTimerList)) {
			appLocalStorage.savedSingleTimerList = [];
		}
		// 如果已保存循环计时器列表不是一个数组，就把它设置成一个空数组
		if (!Array.isArray(appLocalStorage.savedLoopTimerList)) {
			appLocalStorage.savedLoopTimerList = [];
		}
		// 把经过处理过的对象保存到本地存储中
		uni.setStorageSync("todo-timer", appLocalStorage);
	}
}

function getLocalStorage() {
	const result = uni.getStorageSync("todo-timer");
	return result;
}

function updateLocalStorage(value) {
	uni.setStorageSync("todo-timer", value);
}

export default {
	checkLocalStorage,
	getLocalStorage,
	updateLocalStorage,
};