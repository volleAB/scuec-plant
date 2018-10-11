import axios from '@/axios'

export function getAllPlant() {
  return axios.get('plant').then(res => {
    return res.data
  })
}

export function delPlant(name) {
  return axios.post('delplant', {
    name: name
  })
}

export function addPlant(pInfo) {
  return axios.post('addplant', pInfo)
}
