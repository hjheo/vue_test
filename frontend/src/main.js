import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios
window.$ = window.jQuery = require('jquery')

require('../semantic/dist/semantic.min.js')
require('../semantic/dist/semantic.min.css')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
