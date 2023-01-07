import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useLocalStorage } from '../hooks/useLocalStorage'

type RequireAuthProps = React.PropsWithChildren<{
  allowedRoles: Array<string>
}>

export const RequireAuth = ({
  allowedRoles,
}: RequireAuthProps): JSX.Element => {
  const location = useLocation()
  const { user } = useAuth()
  const [userToken] = useLocalStorage('token', '')

  return user?.role && allowedRoles?.includes(user.role) && userToken ? (
    <Outlet />
  ) : userToken ? (
    <></>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}
