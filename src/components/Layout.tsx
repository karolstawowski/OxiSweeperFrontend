import { Outlet } from 'react-router-dom'

export const Layout = (): JSX.Element => {
  return (
    <div className="flex items-center justify-center min-h-screen text-white bg-slate-800">
      <Outlet />
    </div>
  )
}
