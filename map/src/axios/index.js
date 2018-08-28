import axios from 'axios'
import config from './config'
import {
  requestFailFunc,
  requestSuccessFunc,
  responseFailFunc,
  responseSuccessFunc
} from './interceptors'

let instance = axios.create(config)

instance.interceptors.request.use(requestSuccessFunc, requestFailFunc)
instance.interceptors.response.use(responseSuccessFunc, responseFailFunc)

export default instance
