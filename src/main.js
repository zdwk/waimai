// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {
  Button
} from 'mint-ui'
import VueLazyLoad from 'vue-lazyload'
import 'mint-ui/lib/style.min.css' // 引入 mint-ui 样式
import App from './App'
import router from './router'
import store from './store'

// 加载 mockServer 即可
import './mock/mockServer'

import loading from './common/images/loading.gif'

import './filters' // 加载过滤器

// 注册全局组件标签
Vue.component(Button.name, Button)

Vue.use(VueLazyLoad, { // 内部自定义了一个指令 lazy
  loading
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
