import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/components/Login'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import PracticeApp from '@/components/practice/PracticeApp'
import AssigningWork from '@/components/assigning_work/AssigningWork'
import AssigningWorkDev from '@/components/assigning_work/AssigningWorkDev'
import NotFound from '@/components/NotFound'

const firebase = require("firebase");

let LoggedinUser = {
  is_admin: false
};

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    user.getIdTokenResult(true).then((idTokenResult) => {
      if (idTokenResult.claims.admin) {
        LoggedinUser.is_admin = true;
        console.log('admin!! by router');
      } else {
        console.log('not admin... by router');
      }
    });
  }
});

Vue.use(VueRouter)

let router = new VueRouter({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/assigning_work',
      name: 'assigning_work',
      component: AssigningWork,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/assigning_work_dev',
      name: 'assigning_work_dev',
      component: AssigningWorkDev
    },
    {
      path: '/practice',
      name: 'practice',
      component: PracticeApp
    },
    {
      path: '*',
      name: 'notfound',
      component: NotFound
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !LoggedinUser.is_admin) {
    next({
      path: '/',
      query: {
        redirect: to.fullPath
      }
    });
  } else {
    next();
  }
});

export default router;