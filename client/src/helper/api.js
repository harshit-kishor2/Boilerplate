import axios from 'axios'

const service = axios.create()

service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response.status === 500) {
      console.log('500')
    } else if (error.response.status === 401) {
      console.log('401')
    } else if (error.response.status === 403) {
      console.log('403')
    } else if (error.response.status === 404) {
      console.log('404')
    }
    return Promise.reject(error)
  },
)

export default service
