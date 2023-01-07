import { useContext } from 'react'
import { AuthContext, AuthType } from '../context/AuthProvider'

export const useAuth = (): AuthType => {
  return useContext(AuthContext)
}
