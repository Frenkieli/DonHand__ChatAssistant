import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

import increment from '../views/increment.vue'
import TermsOfUse from '../views/TermsOfUse.vue'
import PageNotFound from '../views/PageNotFound.vue'

const routes = [
  {
    path: '/',
    name: 'increment',
    component: increment,
    
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
  routes
})

export default router;
