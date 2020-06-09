import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/pages/index/Index.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    children: [{
        path: '',
        component: Index
      },
      {
        path: 'wenda',
        component: () => import('../views/pages/wenda/Index.vue')
      },
      {
        path: 'video',
        component: () => import('../views/pages/video/Index.vue')
      },
      {
        path: 'my',
        component: () => import('../views/pages/my/Index.vue')
      }
    ]
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router