import { Timestamp } from 'firebase/firestore'
import { UserRole } from './user'

export interface Invitation {
  id: string
  createdAt: Timestamp
  department: string
  email: string
  expiresAt: Timestamp
  fullName: string
  role: UserRole
}
