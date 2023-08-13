'use client'

import { useRef, useState, useTransition } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { RxCross2 } from 'react-icons/rx'
import { inviteUserToDepartment } from '../actions'
import { toast } from 'react-hot-toast'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { collection, orderBy, query } from 'firebase/firestore'
import { firebaseFirestore } from '@/firebase/client'
import { departmentConverter } from '@/firebase/converters'
import Loader from '@/app/components/Loader'
import { USER_ROLES } from '@/utils/constants'

export default function BackofficeTabUsers() {
  const [isPending, startTransition] = useTransition()
  const [createUserDialogOpen, setCreateUserDialogOpen] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const [departments, isLoadingDepartments] = useCollectionData(
    collection(firebaseFirestore, 'departments').withConverter(
      departmentConverter
    )
  )

  return (
    <div className="py-5">
      <div className="flex justify-end">
        <Dialog.Root
          open={createUserDialogOpen}
          onOpenChange={setCreateUserDialogOpen}
        >
          <Dialog.Trigger asChild>
            <button className="btn btn-primary">Invite User</button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-black/40 data-[state=open]:animate-overlayShow fixed inset-0" />
            <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[550px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
              <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                Invite User
              </Dialog.Title>

              <form
                ref={formRef}
                action={(formdata) =>
                  startTransition(async () => {
                    const { message } = await inviteUserToDepartment(formdata)
                    toast.success(message)
                    setCreateUserDialogOpen(false)
                    formRef.current?.reset()
                  })
                }
                className="mt-5"
              >
                <div className="space-y-5">
                  <div className="form-control w-full">
                    <label htmlFor="userFullname" className="label font-lato">
                      <span className="label-text">Fullname</span>
                    </label>
                    <input
                      type="text"
                      id="userFullname"
                      name="fullname"
                      placeholder="Enter user fullname"
                      className="input input-bordered w-full"
                      autoComplete="name"
                      required
                    />
                  </div>

                  <div className="form-control w-full">
                    <label htmlFor="userEmail" className="label font-lato">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="text"
                      id="userEmail"
                      name="email"
                      placeholder="Enter user email"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div className="form-control w-full">
                    <div className="grid grid-cols-2 gap-x-5">
                      <div>
                        <label htmlFor="department" className="label font-lato">
                          <span className="label-text">Department</span>
                        </label>
                        <select
                          className="select w-full"
                          name="department"
                          id="department"
                          required
                        >
                          <option disabled selected>
                            Select Department
                          </option>
                          {departments?.map((department) => (
                            <option key={department.id}>
                              {department.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="role" className="label font-lato">
                          <span className="label-text">Role</span>
                        </label>
                        <select
                          className="select w-full"
                          name="role"
                          id="role"
                          required
                        >
                          <option disabled selected>
                            Select Role
                          </option>
                          {Object.entries(USER_ROLES).map(([key, role]) => (
                            <option key={key}>{role}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isPending || isLoadingDepartments}
                  >
                    {(isPending || isLoadingDepartments) && (
                      <span className="loading loading-spinner"></span>
                    )}
                    Save Details
                  </button>
                </div>
              </form>

              <Dialog.Close asChild>
                <button
                  className="btn btn-ghost btn-circle text-xl absolute top-[10px] right-[10px]"
                  aria-label="Close"
                >
                  <RxCross2 />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      <div className="overflow-x-auto">
        {false ? (
          <Loader />
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Fullname</th>
                <th>Email</th>
                <th>Departments</th>
                <th>Account Creation Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* {departments?.map((department, index) => (
                <tr key={department.id}>
                  <td>{index + 1}</td>
                  <td>{department.title}</td>
                  <td>{department.description}</td>
                  <td>
                    {dayjs(department.createdAt.toDate()).format(
                      'DD MMMM, YYYY'
                    )}
                  </td>
                  <td>
                    <button className="btn btn-circle btn-ghost text-2xl">
                      <CiCircleMore />
                    </button>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
