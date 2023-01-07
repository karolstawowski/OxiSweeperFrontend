import { UserRole } from '../enums/userRole'

export type UserRegisterResponse = {
  user: { name: string }
  token: string
  role: string
}

export type UserRoleResponse = { role: UserRole }

export type ResponseMessage = {
  response: { data: { message: string } }
}

export type UsersResponse = Array<{
  id: number
  name: string
  user_role_id: string
  user_role: {
    id: number
    role_name: string
  }
}>

export type ScoresResponse = Array<{
  id: number
  score: number
  difficulty_level: number
  user_id: {
    id: number
    name: string
  }
}>
