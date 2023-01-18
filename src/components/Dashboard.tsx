import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { getData } from '../api/api-client'
import { ApiEndpoint } from '../enums/api-endpoints'
import { useAuth } from '../hooks/useAuth'
import {
  ResponseMessage,
  ScoresResponse,
  UsersResponse,
} from '../types/responseTypes'

export const Dashboard = (): JSX.Element => {
  const { user } = useAuth()
  const [cookies] = useCookies<'userToken', { [k: string]: string }>([
    'userToken',
  ])
  const [users, setUsers] = useState<UsersResponse>()
  const [scores, setScores] = useState<ScoresResponse>()
  const [fetchError, setfetchError] = useState<string>()

  useEffect(() => {
    getData<UsersResponse>(ApiEndpoint.Users, cookies.userToken)
      .then((data) => setUsers(data))
      .catch((error: ResponseMessage) =>
        setfetchError(error.response.data.message)
      )

    getData<ScoresResponse>(ApiEndpoint.Scores, cookies.userToken)
      .then((data) => setScores(data))
      .catch((error: ResponseMessage) =>
        setfetchError(error.response.data.message)
      )
  }, [])

  return (
    <>
      <div>
        <h1 className="mb-4 text-xl font-medium text-center">
          Hello {user?.role}!
        </h1>
        <p>{fetchError}</p>
        {users && (
          <>
            <h2 className="my-1 text-lg text-center">Registered users list</h2>
            <div className="rounded-md min-w-[260px] max-h-[40vh] overflow-y-auto">
              <table className="w-full">
                <thead className="leading-8 bg-slate-700">
                  <tr>
                    <th>Id</th>
                    <th>User name</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody className="[&>*:nth-child(odd)]: bg-slate-500 [&>*:nth-child(even)]:bg-slate-600">
                  {users.map((user) => (
                    <tr className="leading-7" key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.user_role.role_name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {scores && (
          <>
            <h2 className="my-1 mt-3 text-lg text-center">Scores list</h2>
            <div className="rounded-md min-w-[260px] max-h-[40vh] overflow-y-auto">
              <table className="w-full">
                <thead className="leading-8 bg-slate-700">
                  <tr>
                    <th>User name</th>
                    <th>Score</th>
                    <th>Difficulty level</th>
                  </tr>
                </thead>
                <tbody className="[&>*:nth-child(odd)]: bg-slate-500 [&>*:nth-child(even)]:bg-slate-600">
                  {scores.map((score) => (
                    <tr className="leading-7" key={score.id}>
                      <td>{score.user_id.name}</td>
                      <td>{score.score}</td>
                      <td>{diffuicultyLevelDict[score.difficulty_level]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  )
}

const diffuicultyLevelDict: { [key: number]: string } = {
  1: 'Easy',
  2: 'Intermediate',
  3: 'Hard',
}
