import { DocumentData, SnapshotOptions } from 'firebase/firestore'
import {
  DepartmentChannel,
  DepartmentChannelMembership,
  DepartmentChannelMessage,
} from '@/typings'

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

export const departmentChannelMessageConverter = {
  toFirestore: (
    departmentMembership: DepartmentChannelMessage
  ): DocumentData => {
    return departmentMembership
  },
  fromFirestore: (
    snapshot: DocumentData,
    options: SnapshotOptions
  ): DepartmentChannelMessage => {
    const data = snapshot.data(options)

    return {
      ...data,
      id: snapshot.id,
    }
  },
}
