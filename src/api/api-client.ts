import axios from 'axios'
import { ApiEndpoint } from '../enums/api-endpoints'

const apiUrl: string = import.meta.env.VITE_API_URL + '/api'

export const getData = async <T>(
  endpoint: ApiEndpoint,
  userToken?: string
): Promise<T> => {
  const apiRoute = 'http://' + apiUrl + endpoint
  const response = await axios.get(
    apiRoute,
    userToken
      ? {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken,
          },
        }
      : {
          headers: {
            'Content-Type': 'application/json',
          },
        }
  )

  return response.data
}

export const postData = async <T>(
  endpoint: ApiEndpoint,
  data?: {
    [key: string]: string | number | null
  },
  userToken?: string
): Promise<T> => {
  const apiRoute = 'http://' + apiUrl + endpoint
  const response = await axios.post(
    apiRoute,
    data,
    userToken
      ? {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken,
          },
        }
      : {
          headers: {
            'Content-Type': 'application/json',
          },
        }
  )

  return response.data
}
