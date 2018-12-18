// 定义拦截器，处理请求的操作
export function requestSuccessFunc(requestObj) {
  console.info(`requestSuccessFunc url(${requestObj.url})`, requestObj)
  return Promise.resolve(requestObj)
}

export function requestFailFunc(requestError) {
  console.info(`requestFailFunc url(${requestError.url})`, requestError)
  return Promise.reject(requestError)
}

export function responseSuccessFunc(responseObj) {
  console.info(`responseSuccessFunc`)
  return Promise.resolve(responseObj)
}

export function responseFailFunc(responseError) {
  console.log(responseError)
  return Promise.reject(responseError)
}
