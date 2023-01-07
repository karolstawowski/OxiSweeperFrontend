import { Game } from '../components/Game'
import { LogoutButton } from '../components/LogoutButton'

export const GamePage = (): JSX.Element => {
  return (
    <>
      <LogoutButton />
      <Game />
    </>
  )
}
