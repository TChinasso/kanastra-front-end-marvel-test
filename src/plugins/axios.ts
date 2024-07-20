import axios, { type AxiosInstance } from 'axios'

const instance: AxiosInstance = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public',
  timeout: 60000,
  headers: { 'Content-Type': 'application/json' }
})

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default instance
