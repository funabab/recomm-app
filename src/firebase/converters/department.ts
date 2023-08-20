import { Department, DepartmentMembership } from '@/typings'
import { DocumentData, SnapshotOptions } from 'firebase/firestore'

export const departmentConverter = {
  toFirestore: (department: Department): DocumentData => {
    return {
      title: department.title,
      description: department.description,
    }
  },
  fromFirestore: (
    snapshot: DocumentData,
    options: SnapshotOptions
  ): Department => {
    const data = snapshot.data(options)

    return {
      ...data,
      id: snapshot.id,
    }
  },
}

export const departmentMemberConverter = {
  toFirestore: (departmentMembership: DepartmentMembership): DocumentData => {
    return departmentMembership
  },
  fromFirestore: (
    snapshot: DocumentData,
    options: SnapshotOptions
  ): DepartmentMembership => {
    const data = snapshot.data(options)

    return {
      ...data,
      id: snapshot.id,
    }
  },
}
