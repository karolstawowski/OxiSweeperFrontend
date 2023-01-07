import { createContext, useState } from 'react'

type AuthProviderType = {
  children: React.ReactNode
}

export type User = {
  role: string
}

export type AuthType = {
  user: User | null
  setUser: (user: User | null) => void
}

export const AuthContext = createContext<AuthType>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {},
})

export const AuthProvider = ({ children }: AuthProviderType): JSX.Element => {
  const [user, setUser] = useState<User | null>(null)

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
