'use client'

import { UserRole } from '@/typings'
import React from 'react'
import { useDepartmentRole } from '../_hooks'

interface Props {
  roles: UserRole[]
  children: React.ReactNode
}

export default function DepartmentRoleVisible({ roles, children }: Props) {
  const userRole = useDepartmentRole()

  if (roles.includes(userRole as UserRole) === false) {
    return null
  }

  return <>{children}</>
}
