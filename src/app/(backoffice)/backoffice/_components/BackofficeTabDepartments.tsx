'use client'

import { CiCircleMore } from 'react-icons/ci'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { collection, orderBy, query } from 'firebase/firestore'
import { firebaseFirestore } from '@/firebase/client'
import { departmentConverter } from '@/firebase/converters'
import dayjs from 'dayjs'
import Loader from '@/app/_components/Loader'
import BackofficeCreateDepartmentModal from './BackofficeCreateDepartmentModal'
import { useState, useTransition } from 'react'
import { Department } from '@/typings'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import BackofficeEditDepartmentModal from './BackofficeEditDepartmentModal'
import { toast } from 'react-hot-toast'
import { deleteDepartment } from '@/app/_actions/department'

export default function BackofficeTabDepartments() {
  const [departments, isLoading] = useCollectionData(
    query(
      collection(firebaseFirestore, 'departments').withConverter(
        departmentConverter
      ),
      orderBy('createdAt', 'desc')
    )
  )
  const [editDepartment, setEditDepartment] = useState<Department | undefined>()
  const [isDeleteDepartmentPending, startDeleteDepartmentTransition] =
    useTransition()

  return (
    <div className="py-5">
      <div className="flex justify-end">
        <BackofficeCreateDepartmentModal
          dialogTrigger={
            <button className="btn btn-primary">Create Department</button>
          }
        />
      </div>

      <div className="overflow-x-auto">
        {isLoading ? (
          <Loader />
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th className="text-center">Members</th>
                <th>Created At</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {departments?.map((department, index) => (
                <tr key={department.id}>
                  <td>{index + 1}</td>
                  <td>{department.title}</td>
                  <td>{department.description}</td>
                  <td className="text-center">
                    {Number(department.membersCount) || 0}
                  </td>
                  <td>
                    {dayjs(department.createdAt.toDate()).format(
                      'DD MMMM, YYYY'
                    )}
                  </td>
                  <td>
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger asChild>
                        <button className="btn btn-circle btn-ghost text-2xl outline-none">
                          <CiCircleMore />
                        </button>
                      </DropdownMenu.Trigger>

                      <DropdownMenu.Portal>
                        <DropdownMenu.Content asChild>
                          <ul className="menu bg-white text-neutral w-56 rounded-box shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
                            <DropdownMenu.Item
                              className="cursor-pointer outline-none text-neutral font-lato font-bold"
                              asChild
                            >
                              <li onClick={() => setEditDepartment(department)}>
                                <a>Edit</a>
                              </li>
                            </DropdownMenu.Item>

                            <DropdownMenu.Item
                              className="cursor-pointer outline-none font-lato font-bold text-error"
                              asChild
                            >
                              <li
                                onClick={() => {
                                  if (isDeleteDepartmentPending) {
                                    return
                                  }
                                  const toastId = toast.loading(
                                    `Deleting ${department.title} departmemt`
                                  )
                                  startDeleteDepartmentTransition(async () => {
                                    const { message } = await deleteDepartment(
                                      department.id
                                    )
                                    toast.success(message, {
                                      id: toastId,
                                    })
                                  })
                                }}
                              >
                                <a>Delete</a>
                              </li>
                            </DropdownMenu.Item>
                            <DropdownMenu.Arrow className="fill-white" />
                          </ul>
                        </DropdownMenu.Content>
                      </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <BackofficeEditDepartmentModal
        department={editDepartment}
        onOpenChange={(open) => !open && setEditDepartment(undefined)}
      />
    </div>
  )
}
