import axios from 'axios'
import config from './config'
import {
  requestFailFunc,
  requestSuccessFunc,
  responseFailFunc,
  responseSuccessFunc
} from './interceptors'
// 定义一个axios实例
let instance = axios.create(config)
// 注册request和response的拦截器
instance.interceptors.request.use(requestSuccessFunc, requestFailFunc)
instance.interceptors.response.use(responseSuccessFunc, responseFailFunc)

export default instance
