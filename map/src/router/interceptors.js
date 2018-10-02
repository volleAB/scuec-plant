import store from '@/store'

export function beforeEachFunc(to, form, next) {
  if (to.name === 'home' || to.name === 'login') {
    next()
  } else if (store.getters.token) {
    next()
  } else {
    next('/login')
  }
}
