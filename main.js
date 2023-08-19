import Vue from 'vue'
import App from './App'

// 引入 uView
import uView from 'uview-ui';
Vue.use(uView);

// 引入自定义工具类
import myTimeTools from 'common/time.js'
Vue.prototype.$time = myTimeTools
import tools from 'common/tools.js'
Vue.prototype.$tools = tools

// 引入 vue-awesome-countdown
import vueAwesomeCountdown from 'vue-awesome-countdown'
Vue.use(vueAwesomeCountdown, 'vac')

// 引入自定义混入
import mixin from 'mixin/mixin.js'
Vue.use(mixin)

// 国际化
import VueI18n from 'vue-i18n'
import messages from './common/lang.js'
Vue.use(VueI18n)
const i18n = new VueI18n({
	locale: 'zh-CN', // 默认选择的语言
	messages
})

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	i18n,
	...App
})
app.$mount()