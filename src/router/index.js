import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../components/BusinessManagement'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'app',
    component: App
  },
  {
    path: '/BusinessManagement',
    name: 'BusinessManagement',
    component: () => import('../components/BusinessManagement')
  },
  {
    path: '/manageusergroup',
    name: 'manageusergroup',
    component: () => import('../components/manageusergroup')
  },
  {
    path: '/TheTenderReview',
    name: 'TheTenderReview',
    component: () => import('../components/TheTenderReview')
  },
  {
    path: '/imageUpload',
    name: 'imageUpload',
    component: () => import('../components/imageUpload')
  },
  {
    path: '/peakfire',
    name: 'peakfire',
    component: () => import('../components/peakfire')
  },
  {
    path: '/changePasswrod',
    name: 'changePasswrod',
    component: () => import('../components/changePasswrod')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
