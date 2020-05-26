import Vue from 'vue'
import moment from 'moment'

Vue.filter('dashYmd', (value) => {
  if (!value) return ''
  value = value.toString()
  return moment(value).utc().format('YY-MM-DD')
})