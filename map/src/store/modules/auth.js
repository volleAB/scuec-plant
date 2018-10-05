import { getToken, setToken, rmToken } from '@/utils/auth'

const auth = {
  state: {
    token: getToken()
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      setToken(token)
    },
    RM_TOKEN: () => {
      rmToken()
    }
  },
  actions: {
    setToken({ commit }, token) {
      commit('SET_TOKEN', token)
    },
    rmToken({ commit }) {
      commit('RM_TOKEN')
    }
  }
}

export default auth
