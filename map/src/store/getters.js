const getters = {
  token: state => state.Auth.token,
  plant: state => state.Plant.plant.result
}

export default getters
