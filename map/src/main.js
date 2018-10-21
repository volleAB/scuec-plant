// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import lottie from 'vue-lottie'
import VueCropper from 'vue-cropper'

import VeHistogram from 'v-charts/lib/histogram.common'
import VeLine from 'v-charts/lib/line.common'
import VeBar from 'v-charts/lib/bar.common'

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
  Submenu,
  Notification,
  Button,
  ButtonGroup,
  Input,
  Select,
  Option,
  Form,
  FormItem,
  Dialog,
  Carousel,
  CarouselItem,
  Loading,
  Footer,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Table,
  TableColumn,
  Popover,
  MessageBox,
  Message,
  Progress,
  Tooltip,
  TabPane,
  Tabs,
  Upload,
  Card
} from 'element-ui'

import axios from './axios'
import _ from 'lodash'
import '@/assets/style/index.less'
import '@/assets/icon/iconfont.css'

Vue.prototype.$axios = axios
Vue.prototype._ = _

Vue.config.productionTip = false

Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Dialog)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Loading.directive)
Vue.use(Popover)
Vue.use(Progress)
Vue.use(Tooltip)
Vue.use(TabPane)
Vue.use(Tabs)
Vue.use(Upload)
Vue.use(Card)

Vue.use(VueCropper)

Vue.prototype.$notify = Notification
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message

Vue.component(VeHistogram.name, VeHistogram)
Vue.component(VeLine.name, VeLine)
Vue.component(VeBar.name, VeBar)

Vue.component('lottie', lottie)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
