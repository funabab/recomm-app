import { User } from '@/typings'
import { DocumentData, SnapshotOptions } from 'firebase/firestore'

export const userConverter = {
  toFirestore: (user: User): DocumentData => {
    return user
  },
  fromFirestore: (snapshot: DocumentData, options: SnapshotOptions): User => {
    const data = snapshot.data(options)

    return {
      ...data,
      id: snapshot.id,
    }
  },
}
