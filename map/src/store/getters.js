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
  // 通过返回一个函数的方式，实现getter传参来获取我们需要的每一个描述图片
  indexImg: state => name => {
    return state.Plant.plant.result.find(res => res.name === name).img[0]
  },
  walkFlag: state => state.Plant.walkFlag
}

export default getters
