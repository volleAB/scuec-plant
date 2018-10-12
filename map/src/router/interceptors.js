import store from '@/store'
import Vue from 'vue'

export function beforeEachFunc(to, form, next) {
  if (to.name === 'home' || to.name === 'login') {
    next()
  } else if (to.name === 'exit' && store.getters.token) {
    store.dispatch('rmToken').then(() => {
      Vue.prototype.$message({
        type: 'success',
        message: '已退出系统'
      })
      next('/')
    })
  } else if (store.getters.token) {
    next()
  } else {
    next('/login')
  }
}
