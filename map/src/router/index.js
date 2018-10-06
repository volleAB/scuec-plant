import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

const Home = resolve => require(['../views/Home.vue'], resolve)
const Login = resolve => require(['../views/Login.vue'], resolve)
const Admin = resolve => require(['../views/Admin.vue'], resolve)

const Help = resolve => require(['../components/help.vue'], resolve)
const ContactUs = resolve => require(['../components/contactUs.vue'], resolve)
const Overview = resolve => require(['../components/overview.vue'], resolve)
const AddPlant = resolve => require(['../components/addPlant.vue'], resolve)
const PlantManager = resolve =>
  require(['../components/plantManager.vue'], resolve)

export default new Router({
  // mode: 'history',
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
          name: 'plantManager',
          component: PlantManager
        },
        {
          path: 'overview',
          name: 'overview',
          component: Overview
        },
        {
          path: 'addPlant',
          name: 'addPlant',
          component: AddPlant
        },
        {
          path: 'contactUs',
          name: 'contactUs',
          component: ContactUs
        },
        {
          path: 'help',
          name: 'help',
          component: Help
        }
      ]
    }
  ]
})
