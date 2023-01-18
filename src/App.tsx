import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { postData } from './api/api-client'
import { Layout } from './components/Layout'
import { RequireAuth } from './components/RequireAuth'
import { ApiEndpoint } from './enums/api-endpoints'
import { UserRole } from './enums/userRole'
import { useAuth } from './hooks/useAuth'
import { DashboardPage } from './routes/dashboard'
import { GamePage } from './routes/game'
import { Login } from './routes/login'
import { Register } from './routes/register'
import { UserRoleResponse } from './types/responseTypes'

export const App = (): JSX.Element => {
  const { user, setUser } = useAuth()
  const [cookies] = useCookies<'userToken', { [k: string]: string }>([
    'userToken',
  ])
  const navigate = useNavigate()

  const getRole = async (): Promise<void> => {
    await postData<UserRoleResponse>(
      ApiEndpoint.Role,
      {
        token: cookies.userToken,
      },
      cookies.userToken
    )
      .then((data) => {
        setUser({ role: data.role })

        if (data.role === UserRole.User) navigate('/game')
        else if (data.role === UserRole.Admin) navigate('/dashboard')
      })
      .catch((error: { response: { data: { message: string } } }) => {
        console.error(error.response.data.message)
      })
  }

  useEffect(() => {
    if (!cookies.userToken) {
      navigate('/login')
    } else if (!user) {
      getRole()
    }

    if (user?.role === UserRole.User) navigate('/game')
    else if (user?.role === UserRole.Admin) navigate('/dashboard')
  }, [user, cookies.userToken])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<RequireAuth allowedRoles={['Admin']} />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[UserRole.User]} />}>
          <Route path="/game" element={<GamePage />} />
        </Route>
      </Route>
    </Routes>
  )
}
