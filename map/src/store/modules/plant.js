import { getAllPlant, delPlant, addPlant } from '@/utils/plant'

const plant = {
  state: {
    plant: null
  },
  mutations: {
    GET_PLANT: state => {
      if (!state.plant) {
        getAllPlant().then(data => {
          state.plant = data
        })
      }
    },
    DEL_PLANT: (state, name) => {
      delPlant(name).then(() => {
        let index = state.plant.result.findIndex(item => {
          return item.name === name
        })
        state.plant.result.splice(index, 1)
      })
    },
    ADD_PLANT: (state, pInfo) => {
      addPlant(pInfo).then(() => {
        state.plant.result.push(pInfo)
      })
    }
  },
  actions: {
    getPlant({ commit }) {
      commit('GET_PLANT')
    },
    delPlant({ commit }, name) {
      commit('DEL_PLANT', name)
    },
    addPlant({ commit }, pInfo) {
      commit('ADD_PLANT', pInfo)
    }
  }
}

export default plant
