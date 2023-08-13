import axios from 'axios'

// export const getAxios=(url,)

export const getTokenFromLocalStorage = () => {
  const user = localStorage.getItem('user')
  const parsedUser = JSON.parse(user)
  const userRole = parsedUser?.roles[0]
  const accessToken = parsedUser?.accessToken
  return accessToken
}

export const createAxios = (apiUrl, accessToken) => {
  const authAxios = axios.create({
    baseURL: apiUrl,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return authAxios
}

//GLOBAL INTERCEPTER
// axios.interceptors.request.use(
//   (config) => {
//     config.headers.authorization = `Bearer ${token}`
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )
