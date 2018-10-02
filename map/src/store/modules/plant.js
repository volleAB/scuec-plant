import { getAllPlant, delPlant } from '@/utils/plant'

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
        let index = state.plant.findIndex(item => {
          return item.name === name
        })
        state.plant.splice(index, 1)
      })
    }
  },
  actions: {
    getPlant({ commit }) {
      commit('GET_PLANT')
    },
    delPlant({ commit }, name) {
      commit('DEL_PLANT', name)
    }
  }
}

export default plant
