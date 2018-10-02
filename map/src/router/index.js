import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

const Home = resolve => require(['../views/Home.vue'], resolve)
const Login = resolve => require(['../views/Login.vue'], resolve)
const Admin = resolve => require(['../views/Admin.vue'], resolve)

const PlantManager = resolve =>
  require(['../components/plantManager.vue'], resolve)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      children: [
        {
          path: 'plantManager',
          component: PlantManager
        }
      ]
    }
  ]
})
