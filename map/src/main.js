// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import {
  Container,
  Header,
  Aside,
  Main,
  Row,
  Col,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu
} from 'element-ui'

Vue.config.productionTip = false

Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
