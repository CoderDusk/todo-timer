import Vue from 'vue'
import App from './App'

// 引入 uView
import uView from 'uview-ui';
Vue.use(uView);

// 引入自定义工具类
import mytime from 'common/time.js'
Vue.use(mytime)
Vue.prototype.mytime = mytime

// 引入 vue-awesome-countdown
import vueAwesomeCountdown from 'vue-awesome-countdown'
Vue.use(vueAwesomeCountdown, 'vac')

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
