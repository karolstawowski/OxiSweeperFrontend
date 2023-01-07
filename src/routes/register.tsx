import { useState } from 'react'
import { postData } from '../api/api-client'
import { LoginRegister } from '../components/LoginRegister'
import { ApiEndpoint } from '../enums/api-endpoints'
import { useAuth } from '../hooks/useAuth'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { ResponseMessage, UserRegisterResponse } from '../types/responseTypes'
import { defaultRedirect } from '../utils/defaultRedirect'

export const Register = (): JSX.Element => {
  const { user, setUser } = useAuth()
  const [_, setUserToken] = useLocalStorage('token', '')
  const [loginError, setLoginError] = useState<string>()

  const onRegister = async (e: React.SyntheticEvent): Promise<Response> => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      username: { value: string }
      password: { value: string }
    }

    await postData<UserRegisterResponse>(ApiEndpoint.Register, {
      name: target.username.value,
      password: target.password.value,
    })
      .then((data) => {
        setUserToken(data.token)
        setUser({ role: data.role })
      })
      .catch((error: ResponseMessage) =>
        setLoginError(error.response.data.message)
      )

    return await defaultRedirect({ userRole: user?.role })
  }

  return (
    <LoginRegister
      onLoginRegister={onRegister}
      type="register"
      loginError={loginError}
    />
  )
}
