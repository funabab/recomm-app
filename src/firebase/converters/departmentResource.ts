import { DocumentData, SnapshotOptions } from 'firebase/firestore'
import { DepartmentResource } from '@/typings'

export const departmentResourceConverter = {
  toFirestore: (departmentResource: DepartmentResource): DocumentData => {
    return departmentResource
  },
  fromFirestore: (
    snapshot: DocumentData,
    options: SnapshotOptions
  ): DepartmentResource => {
    const data = snapshot.data(options)

    return {
      ...data,
      id: snapshot.id,
    }
  },
}
