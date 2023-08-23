import { useParams } from 'next/navigation'
import { useUser } from '../_components/AuthProtect'

export function useDepartmentRole() {
  const user = useUser()
  const { departmentId } = useParams()

  return user?.memberships?.find(
    (membership) => membership.departmentId === departmentId
  )?.role
}
