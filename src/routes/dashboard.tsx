import { Dashboard } from '../components/Dashboard'
import { LogoutButton } from '../components/LogoutButton'

export const DashboardPage = (): JSX.Element => {
  return (
    <>
      <LogoutButton />
      <Dashboard />
    </>
  )
}
