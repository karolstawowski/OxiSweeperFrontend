import { Link } from 'react-router-dom'

type LoginRegisterProps = {
  onLoginRegister: (e: React.SyntheticEvent) => void
  loginError?: string
  type: 'login' | 'register'
}

export const LoginRegister = ({
  onLoginRegister,
  loginError,
  type,
}: LoginRegisterProps): JSX.Element => {
  return (
    <div className="bg-orange-500 w-[600px] h-[400px] rounded-lg overflow-hidden flex items-center">
      <img src="./background.jpg" className="w-1/4 h-full mr-8" />
      <div>
        <h2 className="mb-2 text-xl">{signText[type]} to Minesweeper</h2>
        <form onSubmit={onLoginRegister}>
          <label htmlFor="username">Username</label>
          <br />
          <input type="text" name="username" className="px-1 text-black" />
          <br />
          <label htmlFor="username">Password</label>
          <br />
          <input type="password" name="password" className="px-1 text-black" />
          <br />
          <input
            type="submit"
            value={signText[type]}
            className="px-4 py-2 mt-2 font-medium bg-blue-600 rounded-md cursor-pointer spacing hover:bg-blue-700"
          />
        </form>
        <HelperText type={type} />
        <p className="h-6 font-semibold text-red-800">{loginError}</p>
      </div>
    </div>
  )
}

const HelperText = ({ type }: { type: 'login' | 'register' }): JSX.Element => {
  return (
    <p className="mt-2 text-sm">
      {helpDescription[type] + ' '}
      <Link to={`/${linkTo[type]}`}>{linkToDescription[type]}</Link>
    </p>
  )
}

const helpDescription = {
  register: 'Do you have an account?',
  login: 'New to Minesweeper?',
}

const linkTo = { register: 'login', login: 'register' }

const linkToDescription = { register: 'Log in.', login: 'Create an account.' }

const signText = { register: 'Sign up', login: 'Sign in' }
