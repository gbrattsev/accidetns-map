import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import Registration from '../views/registration.vue'
import Form from '../views/form.vue'
import Map from '../views/map.vue'

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
  },
  {
    path: '/form',
    name: 'Form',
    component: Form
  },
  {
    path: '/map',
    name: 'Map',
    component: Map
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
