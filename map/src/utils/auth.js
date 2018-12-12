import cookie from 'js-cookie'

const TokenKey = 'token'
// 使用cookie来进行token的操作
export const getToken = () => {
  return cookie.getJSON(TokenKey) || false
}

export const setToken = token => {
  return cookie.set(TokenKey, token)
}

export const rmToken = () => {
  return cookie.remove(TokenKey)
}
