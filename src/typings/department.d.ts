import { Timestamp } from 'firebase/firestore'
import { UserRole } from './user'
export interface Department {
  id: string
  title: string
  membersCount?: number
  description: string
  createdAt: Timestamp
}

export interface DepartmentMembership {
  id: string
  userDisplayName: string
  userId: string
  userRole: UserRole
  userEmail: string

  departmentTitle: string
  departmentId: string
  createdAt: Timestamp
}

export interface DepartmentBoardMessage {
  id: string
  content: string

  userDisplayName: string
  userRole: UserRole
  userDepartmentTitle: string
  userDepartmentId: string

  visibleTo?: string
  createdBy: string
  createdAt: Timestamp
}
