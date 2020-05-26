import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import moment from 'moment'

import VueFlatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
Vue.use(VueFlatPickr)

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$moment = moment
window.$ = window.jQuery = require('jquery')

require('../semantic/dist/semantic.min.js')
require('../semantic/dist/semantic.min.css')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
