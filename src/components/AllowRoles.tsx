import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

type AllowRolesProps = {
  allowedRoles: Array<string>
}

export const AllowRoles = ({ allowedRoles }: AllowRolesProps): JSX.Element => {
  const auth = useAuth()

  if (auth?.user?.role && allowedRoles?.includes(auth?.user.role)) {
    return <Outlet />
  }
  return <Navigate to="/login" state={{ from: location }} />
}
