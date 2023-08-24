import { Timestamp } from 'firebase/firestore'

export interface DepartmentResource {
  id: string
  uploadFilePath: string
  uploadFilename: string
  uploadUserId: string
  uploadUserDisplayName: string
  access: 'private' | 'public'
  uploadedAt: Timestamp
}
