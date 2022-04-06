import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListUser from "@/components/ListUser"
import DetailUser from '@/components/DetailUser.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/user',
    component: ListUser
  },
  {
    path: '/user/:id',
    name: "DetailUser",
    component: DetailUser,
    props: true
  }

]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
