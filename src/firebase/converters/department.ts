import {
  Department,
  DepartmentChannel,
  DepartmentChannelMembership,
} from '@/typings'
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

export const departmentChannelConverter = {
  toFirestore: (departmentChannel: DepartmentChannel): DocumentData => {
    return departmentChannel
  },
  fromFirestore: (
    snapshot: DocumentData,
    options: SnapshotOptions
  ): DepartmentChannel => {
    const data = snapshot.data(options)

    return {
      ...data,
      id: snapshot.id,
    }
  },
}

export const departmentChannelMemberConverter = {
  toFirestore: (
    departmentMembership: DepartmentChannelMembership
  ): DocumentData => {
    return departmentMembership
  },
  fromFirestore: (
    snapshot: DocumentData,
    options: SnapshotOptions
  ): DepartmentChannelMembership => {
    const data = snapshot.data(options)

    return {
      ...data,
      id: snapshot.id,
    }
  },
}
