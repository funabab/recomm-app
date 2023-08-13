import { Timestamp } from 'firebase/firestore'
export interface Department {
  id: string
  title: string
  description: string
  createdAt: Timestamp
}
