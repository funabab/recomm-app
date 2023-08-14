import { USER_ROLES } from '../../src/utils/constants'
import { User } from 'firebase/auth'

export type UserRole = keyof typeof USER_ROLES

export interface UserAccountCreationPayload {
  fullname: string
  email: string
  password: string
  invitationId: string
}
