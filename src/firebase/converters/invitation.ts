import { Department, Invitation } from '@/typings'
import { DocumentData, SnapshotOptions } from 'firebase/firestore'

export const invitationConverter = {
  toFirestore: (invitation: Invitation): DocumentData => {
    return {
      department: invitation.department,
      email: invitation.email,
      fullName: invitation.fullName,
      role: invitation.role,
    }
  },
  fromFirestore: (
    snapshot: DocumentData,
    options: SnapshotOptions
  ): Invitation => {
    const data = snapshot.data(options)

    return {
      ...data,
      id: snapshot.id,
    }
  },
}
