import { useState } from 'react'
import { postData } from '../api/api-client'
import { LoginRegister } from '../components/LoginRegister'
import { ApiEndpoint } from '../enums/api-endpoints'
import { useAuth } from '../hooks/useAuth'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { ResponseMessage, UserRegisterResponse } from '../types/responseTypes'
import { defaultRedirect } from '../utils/defaultRedirect'

export const Login = (): JSX.Element => {
  const { setUser } = useAuth()
  const [_, setUserToken] = useLocalStorage('token', '')
  const [loginError, setLoginError] = useState<string>()

  const onLogin = async (e: React.SyntheticEvent): Promise<Response> => {
    let userRole = ''

    e.preventDefault()
    const target = e.target as typeof e.target & {
      username: { value: string }
      password: { value: string }
    }

    await postData<UserRegisterResponse>(ApiEndpoint.Login, {
      name: target.username.value,
      password: target.password.value,
    })
      .then((data) => {
        userRole = data.role
        setUser({ role: data.role })
        setUserToken(data.token)
      })
      .catch((error: ResponseMessage) =>
        setLoginError(error.response.data.message)
      )

    return await defaultRedirect({ userRole: userRole })
  }

  return (
    <LoginRegister
      onLoginRegister={onLogin}
      loginError={loginError}
      type="login"
    />
  )
}
