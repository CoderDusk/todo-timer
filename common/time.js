// 时:分:秒 形式的时间转换为秒数
export function timeToSeconds(h, m, s) {
	return parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s)
}

// 秒数转换为 时:分:秒 形式的字符串
export function secondsToString(seconds) {
	let h = (seconds / 3600) < 10 ? '0' + parseInt(seconds / 3600) : parseInt(seconds / 3600)
	let m = parseInt(seconds / 60) >= 60 ? parseInt(seconds / 60) % 60 : parseInt(seconds / 60)
	m = m < 10 ? '0' + m : m
	let s = (seconds % 60) < 10 ? '0' + parseInt(seconds % 60) : parseInt(seconds % 60)

	// return h + ' : ' + m + ' : ' + s
	return h + ':' + m + ':' + s
}


export default {
	timeToSeconds,
	secondsToString
}
