import _ from 'lodash'

const getters = {
  token: state => state.Auth.token,
  plant: state => state.Plant.plant.result,
  nameOptions: state => {
    let options = []
    state.Plant.plant.result.forEach(item => {
      options.push({
        value: item.name
      })
    })
    return options
  },
  building: state => {
    let building = []
    state.Plant.plant.result.forEach(item => {
      building.push(item.pos.building)
    })
    return _.union(building).sort((a, b) => {
      return a.localeCompare(b, 'zh-CN')
    })
  },
  street: state => {
    let street = []
    state.Plant.plant.result.forEach(item => {
      street.push(item.pos.street)
    })
    return _.union(street).sort((a, b) => {
      return a.localeCompare(b, 'zh-CN')
    })
  },
  genus: state => {
    let genus = []
    state.Plant.plant.result.forEach(item => {
      genus.push(item.genus)
    })
    return _.union(genus).sort((a, b) => {
      return a.localeCompare(b, 'zh-CN')
    })
  },
  family: state => {
    let family = []
    state.Plant.plant.result.forEach(item => {
      family.push(item.family)
    })

    return _.union(family).sort((a, b) => {
      return a.localeCompare(b, 'zh-CN')
    })
  },
  indexImg: state => {
    return state.Plant.plant.result[0].img[0]
  }
}

export default getters
