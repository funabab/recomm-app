'use client'

import { firebaseFirestore } from '@/firebase/client'
import {
  departmentChannelConverter,
  departmentConverter,
} from '@/firebase/converters'
import { doc } from 'firebase/firestore'
import { notFound, useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore'

interface Props {
  children: React.ReactNode
}

export default function DepartmentNotFoundProvider({ children }: Props) {
  const { departmentId, channelId } = useParams()

  const [
    _currentDepartment,
    isLoadingCurrentDepartment,
    _errorCurrentDepartment,
    snapshotCurrentDepartment,
  ] = useDocumentData(
    departmentId
      ? doc(firebaseFirestore, 'departments', departmentId).withConverter(
          departmentConverter
        )
      : null
  )
  const [
    _currentChannel,
    isLoadingCurrentChannel,
    _errorCurrentChannel,
    snapshotCurrentChannel,
  ] = useDocumentData(
    channelId
      ? doc(firebaseFirestore, 'departmentChannels', channelId).withConverter(
          departmentChannelConverter
        )
      : null
  )

  useEffect(() => {
    if (
      (snapshotCurrentChannel && !snapshotCurrentChannel.exists()) ||
      (snapshotCurrentDepartment && !snapshotCurrentDepartment.exists())
    ) {
      notFound()
    }
  }, [
    snapshotCurrentChannel,
    snapshotCurrentDepartment,
    isLoadingCurrentChannel,
    isLoadingCurrentDepartment,
  ])

  return <>{children}</>
}
