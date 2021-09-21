export default {
	install(Vue){
		Vue.mixin({
			data(){
				return {
					storage:null,
					ringtoneAudio:null,
				}
			},
			created() {
				this.storage = this.$tools.getLocalStorage()
			},
			activated(){
				this.storage = this.$tools.getLocalStorage()
			},
			methods:{
				testFunction(){
					console.log('test')
				},
				getStorage(){
					this.storage = this.$tools.getLocalStorage()
				},
				updateStorage(){
					this.$tools.updateLocalStorage(this.storage)
				},
				// 创建铃声音频对象
				createRingtoneAudio() {
					// 创建音频对象
					this.ringtoneAudio = uni.createInnerAudioContext()
					this.ringtoneAudio.src = this.storage.setting.ringtoneFileUrl
					this.ringtoneAudio.volume = this.storage.setting.ringtoneVolume / 100
				}
			}
		})
	}
}