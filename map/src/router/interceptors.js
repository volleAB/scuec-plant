import store from '@/store'
import Vue from 'vue'

// 通过使用路由的控制守卫来实现基本的用户权限管理，实现逻辑：对路由进行判断，如果是需要进行控制的路由，比如是管理路由，那么我们需要对该路由进行token判断，否则跳转到login界面，成功登陆之后，记录token，然后跳转至管理界面
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
