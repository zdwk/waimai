import Vue from 'vue'
// import Moment from 'moment'
import Format from 'date-fns/format'
// 自定义过滤器
Vue.filter('dataFormat', function (value, formatStr = 'YYYY-MM-DD HH:mm:ss') { // 格式化日期
  // return Moment(value).format(formatStr)
  return Format(value, formatStr)
})
