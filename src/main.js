// 导入核心框架vue2.6
import Vue from 'vue'
// 样式重置文件
import 'normalize.css/normalize.css'

// 引入element-ui组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'

import store from './store'

import router from './router'

// 注册svg
import '@/icons'
// 全局注册组件
Vue.use(ElementUI)

// 添加权限控制初始化(直接把permission.js代码立即执行)
import './permission'

Vue.config.productionTip = false

// vue实例化
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
