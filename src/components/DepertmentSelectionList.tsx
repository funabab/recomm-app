import React from 'react'
import DepartmentIcon from './DepartmentIcon'

interface Props {}

const DepertmentSelectionList: React.FC<Props> = () => {
  return (
    <div className="space-y-4">
      <DepartmentIcon title="ICT" />
      <DepartmentIcon title="LIS" selected />
      <DepartmentIcon title="MASSCOM" />
    </div>
  )
}

export default DepertmentSelectionList
