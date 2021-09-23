export default {
	install(Vue) {
		Vue.mixin({
			data() {
				return {
					storage: null,
					ringtoneAudio: null,
					// 时间选择器参数
					pickerParams: {
						hour: true,
						minute: true,
						second: true
					},
					// 时间选择器是否显示的开关变量
					isPickerShow: false,
				}
			},
			created() {
				this.storage = this.$tools.getLocalStorage()
			},
			activated() {
				this.storage = this.$tools.getLocalStorage()
			},
			beforeDestroy() {
				if (!!this.ringtoneAudio && !this.ringtongAudio.paused) {
					this.ringtoneAudio.stop()
				}
			},
			methods: {
				testFunction() {
					console.log('test')
				},
				getStorage() {
					this.storage = this.$tools.getLocalStorage()
				},
				updateStorage() {
					this.$tools.updateLocalStorage(this.storage)
				},
				// 创建铃声音频对象
				createRingtoneAudio() {
					// 创建音频对象
					this.ringtoneAudio = uni.createInnerAudioContext()
					this.ringtoneAudio.src = this.storage.setting.ringtoneFileUrl
					this.ringtoneAudio.volume = this.storage.setting.ringtoneVolume / 100
				},
				gotoIndexPage(tab) {
					uni.navigateTo({
						url: '/pages/mobile/index?tab=' + tab
					})
				},
				toastThenJump(msg, url, animationDuration = 1000) {
					this.$u.toast(msg)
					uni.navigateTo({
						url,
						animationDuration
					})
				},
				toastThenJumpToIndex(msg, tab = 'single'){
					this.$u.toast(msg)
					setTimeout(()=>{
						this.gotoIndexPage(tab)
					},500)
				}
			}
		})
	}
}
