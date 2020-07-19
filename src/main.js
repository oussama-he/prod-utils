import Vue from 'vue'
import App from '@/App.vue'

import store from '@/store' 
import router from '@/router'
import "@/plugins/bookmarks"
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.config.productionTip = false

// Vue.use(VueRouter)
Vue.use(VueAxios, axios)

const vue = new Vue({
  router,
  store,
  render: h => h(App)
})

vue.$mount('#app')
