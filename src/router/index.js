import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'BusinessManagement',
        name: 'BusinessManagement',
        component: () => import('../components/BusinessManagement.vue'),
        meta: {
          auth: true
        }
      },
      {
        path: 'manageusergroup',
        name: 'manageusergroup',
        component: () => import('../components/manageusergroup.vue'),
        meta: {
          auth: true
        }
      },
      {
        path: 'TheTenderReview',
        name: 'TheTenderReview',
        component: () => import('../components/TheTenderReview.vue'),
        meta: {
          auth: true
        }
      },
      {
        path: 'imageUpload',
        name: 'imageUpload',
        component: () => import('../components/imageUpload.vue'),
        meta: {
          auth: true
        }
      },
      {
        path: 'peakfire',
        name: 'peakfire',
        component: () => import('../components/peakfire.vue'),
        meta: {
          auth: true
        }
      },
      {
        path: 'changePasswrod',
        name: 'changePasswrod',
        component: () => import('../components/changePasswrod.vue'),
        meta: {
          auth: true
        }
      }
    ]
  }  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// 注册全局守卫
// 在访问路由之前进行拦截
router.beforeEach((to, from, next) => {
  // 获取 token，登录的标识
  var token = sessionStorage.getItem("token")

  if(to.meta.auth) { // 判断是否需要权限
    if(token) { // 再次判断是否已经有权限了
      next()
    } else {
      next({ // 没有权限，导向登录页
        path: "/login"
      })
    }
  } else {
    next() // 想去哪就去哪
  }
})

export default router
