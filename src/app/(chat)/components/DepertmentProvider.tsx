'use client'
import React, { createContext, useContext } from 'react'
import { firebaseAuth, firebaseFirestore } from '@/firebase/client'
import {
  departmentChannelConverter,
  departmentChannelMemberConverter,
  departmentConverter,
} from '@/firebase/converters'
import {
  Department,
  DepartmentChannel,
  DepartmentChannelMembership,
} from '@/typings'
import { and, collection, doc, or, query, where } from 'firebase/firestore'
import { useParams } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore'

type DepartmentContextValue = {
  currentDepartment?: Department
  currentChannel?: DepartmentChannel
  currentChannelMembership?: DepartmentChannelMembership[]
}

export const DepartmentContext = createContext<DepartmentContextValue | null>(
  null
)

interface Props {
  children: React.ReactNode
}

export default function DepartmentProvider({ children }: Props) {
  const { departmentId, channelId } = useParams()
  const [user] = useAuthState(firebaseAuth)

  const [currentDepartment] = useDocumentData(
    departmentId
      ? doc(firebaseFirestore, 'departments', departmentId).withConverter(
          departmentConverter
        )
      : null
  )
  const [currentChannel] = useDocumentData(
    channelId
      ? doc(firebaseFirestore, 'departmentChannels', channelId).withConverter(
          departmentChannelConverter
        )
      : null
  )
  const [currentChannelMembership] = useCollectionData(
    departmentId && user?.uid
      ? query(
          collection(firebaseFirestore, 'departmentChannelMembers'),
          or(
            where('channelType', '==', 'public'),
            and(
              where('departmentId', '==', departmentId),
              where('userId', '==', user.uid)
            )
          )
        ).withConverter(departmentChannelMemberConverter)
      : null
  )

  return (
    <DepartmentContext.Provider
      value={{
        currentChannel,
        currentDepartment,
        currentChannelMembership,
      }}
    >
      {children}
    </DepartmentContext.Provider>
  )
}

export const useDepartmentValues = () => {
  const values = useContext(DepartmentContext)

  if (!values) {
    throw new Error(
      'useDepartmentValues hook must be used within DepartmentProvider'
    )
  }

  return values
}
