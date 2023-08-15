import { Timestamp } from 'firebase/firestore'
import { USER_ROLES } from '../../src/utils/constants'
import { User as FirebaseUser } from 'firebase/auth'

export type UserRole = keyof typeof USER_ROLES

export interface UserAccountCreationPayload {
  fullname: string
  email: string
  password: string
  invitationId: string
}

export interface User extends FirebaseUser {
  memberships?: {
    departmentTitle: string
    departmentId: string
    role: UserRole
  }[]
  createdAt: Timestamp
}
