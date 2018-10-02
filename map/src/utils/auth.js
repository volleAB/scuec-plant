import cookie from 'js-cookie'

const TokenKey = 'token'

export const getToken = () => {
  return cookie.getJSON(TokenKey) || false
}

export const setToken = token => {
  return cookie.set(TokenKey, token)
}

export const rmToken = () => {
  return cookie.remove(TokenKey)
}
