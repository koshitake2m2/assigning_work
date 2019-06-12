import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import PracticeApp from '@/components/practice/PracticeApp'
import AssigningWork from '@/components/assigning_work/AssigningWork'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/assigning_work',
      name: 'assigning_work',
      component: AssigningWork
    },
    {
      path: '/practice',
      name: 'practice',
      component: PracticeApp
    }
  ]
})