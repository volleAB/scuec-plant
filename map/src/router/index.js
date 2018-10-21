import Router from 'vue-router'
import Vue from 'vue'
import { beforeEachFunc } from './interceptors'
Vue.use(Router)

const Home = resolve => require(['../views/Home.vue'], resolve)
const Login = resolve => require(['../views/Login.vue'], resolve)
const Admin = resolve => require(['../views/Admin.vue'], resolve)

const Help = resolve => require(['../components/help.vue'], resolve)
const ContactUs = resolve => require(['../components/contactUs.vue'], resolve)
const Overview = resolve => require(['../components/overview.vue'], resolve)
const AddPlant = resolve => require(['../components/addPlant.vue'], resolve)
const AddImage = resolve => require(['../components/addImage.vue'], resolve)
const PlantManager = resolve =>
  require(['../components/plantManager.vue'], resolve)
const Manager = resolve => require(['../components/manager.vue'], resolve)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: '/admin/overview',
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
          path: 'addImage',
          name: 'addImage',
          component: AddImage
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
        },
        {
          path: 'manager',
          name: 'manager',
          component: Manager
        },
        {
          path: 'exit',
          name: 'exit'
        }
      ]
    }
  ]
})

router.beforeEach(beforeEachFunc)

export default router
