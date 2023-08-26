import { Timestamp } from 'firebase/firestore'
import { UserRole } from './user'

export interface DepartmentChannel {
  id: string
  title: string
  membersCount?: number
  messagesCount?: number
  description: string
  departmentId: string
  type: 'public' | 'private'
  author: string
  createdAt: Timestamp
}

export interface DepartmentChannelMembership {
  id: string
  departmentId: string

  userDisplayName: string
  userId: string
  userRole: UserRole

  channelType: 'public' | 'private'
  channelTitle: string
  channelId: string
  createdAt: Timestamp
}

export interface DepartmentChannelMessage {
  id: string
  content: string
  userDisplayName: string
  userRole: UserRole
  author: string

  createdAt: Timestamp
}
