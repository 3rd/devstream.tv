import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import FAQ from '@/components/FAQ'
import SubmitContent from '@/components/SubmitContent'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/faq',
      name: 'FAQ',
      component: FAQ
    },
    {
      path: '/submit-content',
      name: 'Submit content',
      component: SubmitContent
    }
  ]
})
