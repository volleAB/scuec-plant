export function requestSuccessFunc(requestObj) {
  console.info(`requestSuccessFunc url(${requestObj.url})`, requestObj)
  return Promise.resolve(requestObj)
}

export function requestFailFunc(requestError) {
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
