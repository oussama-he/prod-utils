import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/bookmarks/Home'
import Bookmarks from '@/components/bookmarks/Bookmarks'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      component: Home,
      name: 'Home',
    },
    {
      path: "/:category",
      component: Bookmarks,
      name: "Bookmarks",
    },
  ],
  mode: "history",
})
