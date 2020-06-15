// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import iView from 'iview'
import 'font-awesome/css/font-awesome.css'
import 'iview/dist/styles/iview.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'
import ElementUI from'element-ui'
import VueResourse from 'vue-resource'
import '../src/styles/index.scss'
import '../src/assets/common.scss'
import '../src/assets/Layout.scss'
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResourse)
Vue.use(iView)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
