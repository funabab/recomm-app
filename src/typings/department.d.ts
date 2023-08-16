import { Timestamp } from 'firebase/firestore'
export interface Department {
  id: string
  title: string
  membersCount?: number
  description: string
  createdAt: Timestamp
}

export interface DepartmentChannel {
  id: string
  title: string
  description: string
  departmentId: string
  createdBy: string
  createdAt: Timestamp
}

export interface DepartmentChannelMembership {
  id: string
  departmentId: string
  userId: string
  channelTitle: string
  channelId: string
  createdAt: Timestamp
}

export interface DepartmentMembership {
  id: string
  userDisplayName: string
  userId: string
  userRole: string
  userEmail: string

  departmentTitle: string
  departmentId: string
  createdAt: Timestamp
}
