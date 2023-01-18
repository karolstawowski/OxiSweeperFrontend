import { useCookies } from 'react-cookie'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

type RequireAuthProps = React.PropsWithChildren<{
  allowedRoles: Array<string>
}>

export const RequireAuth = ({
  allowedRoles,
}: RequireAuthProps): JSX.Element => {
  const location = useLocation()
  const { user } = useAuth()
  const [cookies] = useCookies<'userToken', { [k: string]: string }>([
    'userToken',
  ])

  return user?.role &&
    allowedRoles?.includes(user.role) &&
    cookies.userToken ? (
    <Outlet />
  ) : cookies.userToken ? (
    <></>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}
