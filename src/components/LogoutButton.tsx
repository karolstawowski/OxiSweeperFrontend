import { useNavigate } from 'react-router-dom'
import { postData } from '../api/api-client'
import { ApiEndpoint } from '../enums/api-endpoints'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { ResponseMessage, UserRegisterResponse } from '../types/responseTypes'

export const LogoutButton = (): JSX.Element => {
  const [userToken, setUserToken] = useLocalStorage('token', '')
  const navigate = useNavigate()

  const onLogout = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault()

    setUserToken('')

    await postData<UserRegisterResponse>(
      ApiEndpoint.Logout,
      undefined,
      userToken
    ).catch((error: ResponseMessage) =>
      console.error(error.response.data.message)
    )

    return await navigate('/login')
  }

  return (
    <p
      className="absolute p-1 px-2 rounded-sm cursor-pointer top-2 right-3 hover:bg-slate-600"
      onClick={(e): Promise<void> => onLogout(e)}
    >
      Log out
    </p>
  )
}
