import { useEffect, useState } from 'react'
import { getData } from '../api/api-client'
import { ApiEndpoint } from '../enums/api-endpoints'
import { useAuth } from '../hooks/useAuth'
import { useLocalStorage } from '../hooks/useLocalStorage'
import {
  ResponseMessage,
  ScoresResponse,
  UsersResponse,
} from '../types/responseTypes'

export const Dashboard = (): JSX.Element => {
  const { user } = useAuth()
  const [userToken] = useLocalStorage('token', '')
  const [users, setUsers] = useState<UsersResponse>()
  const [scores, setScores] = useState<ScoresResponse>()
  const [fetchError, setfetchError] = useState<string>()

  useEffect(() => {
    getData<UsersResponse>(ApiEndpoint.Users, userToken)
      .then((data) => setUsers(data))
      .catch((error: ResponseMessage) =>
        setfetchError(error.response.data.message)
      )

    getData<ScoresResponse>(ApiEndpoint.Scores, userToken)
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
            <div className="min-w-[260px]">
              <table className="w-full border-separate border-spacing-x-4 border-spacing-y-1">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>User name</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
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
            <div className="min-w-[260px]">
              <table className="w-full border-separate border-spacing-x-4 border-spacing-y-1">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>User name</th>
                    <th>Score</th>
                    <th>Difficulty level</th>
                  </tr>
                </thead>
                <tbody>
                  {scores.map((score) => (
                    <tr key={score.id}>
                      <td>{score.id}</td>
                      <td>{score.user_id.name}</td>
                      <td>{score.score}</td>
                      <td>{score.difficulty_level}</td>
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
