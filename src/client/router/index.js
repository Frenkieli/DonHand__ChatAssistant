import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

import home from '../views/home.vue'
import introduction from '../views/introduction.vue'
import increment from '../views/increment.vue'
import TermsOfUse from '../views/TermsOfUse.vue'
import PageNotFound from '../views/PageNotFound.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
    
  },
  {
    path: "/chatroom",
    name: "chatroom",
    component: increment,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/reference",
    name: "reference",
    component: TermsOfUse,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/TermsOfUse",
    name: "TermsOfUse",
    component: TermsOfUse,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/:catchAll(.*)",
    name: "PageNotFound",
    component: PageNotFound,
    meta: {
      requiresAuth: false
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return { left: savedPosition.left, top: savedPosition.top }
    }else if (to.hash) {
      let element = document.getElementById(to.hash.replace('#',''));
      let top = element.offsetTop;
      let left = element.offsetLeft;
      console.log(top, 'top');
      return {
        left: left,
        top: top,
      }
    }else {
      return { left: 0, top: 0 }
    }
  }
})


export default router;
