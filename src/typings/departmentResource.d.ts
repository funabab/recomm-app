import { Timestamp } from 'firebase/firestore'

export interface DepartmentResource {
  id: string
  uploadFilePath: string
  uploadedFileSize: number
  uploadFilename: string
  uploadUserId: string
  uploadUserDisplayName: string
  access: 'private' | 'public'
  uploadedAt: Timestamp
}
