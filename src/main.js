import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


// 引入公共样式
import './styles/index.less'

// vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

// 引入 REM 适配
import 'amfe-flexible'

// axios
import request from './util/request'
Vue.prototype.$axios = request

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
