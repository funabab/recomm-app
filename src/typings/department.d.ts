import { Timestamp } from 'firebase/firestore'
export interface Department {
  id: string
  title: string
  membersCount?: number
  description: string
  createdAt: Timestamp
}
