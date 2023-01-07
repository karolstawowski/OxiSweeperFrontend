import { redirect } from 'react-router-dom'
import { UserRole } from '../enums/userRole'

type DefaultRedirectProps = {
  userRole?: string
}

export const defaultRedirect = ({
  userRole,
}: DefaultRedirectProps): Response => {
  if (userRole === UserRole.Admin) {
    return redirect('/dashboard')
  }

  if (userRole === UserRole.User) {
    return redirect('/game')
  }

  return redirect('/login')
}
