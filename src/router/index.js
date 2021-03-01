import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import Registration from '../views/registration.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration
  }
]

const router = new VueRouter({
  routes
})

export default router
