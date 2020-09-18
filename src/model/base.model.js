import axios from 'axios'
import { apiURL } from '../config/constants'

const instance = axios.create({
  baseURL: apiURL + '/mms/v1/',
  timeout: 20000
})
// 拦截器
instance.interceptors.request.use(request => {
  // let token = new TokenStore().get() || ''
  // request.headers['Authorization'] = 'Bearer ' + token
  return request
}, error => {
  return Promise.reject(error)
})
instance.interceptors.response.use(response => {
  const data = response.data
  data.status = response.status
  return data
}, error => {
  return Promise.reject(error)
})

export default instance
