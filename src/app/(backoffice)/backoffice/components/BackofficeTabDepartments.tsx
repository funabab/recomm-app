'use client'

import { useRef, useState, useTransition } from 'react'
import { CiCircleMore } from 'react-icons/ci'
import * as Dialog from '@radix-ui/react-dialog'
import { RxCross2 } from 'react-icons/rx'
import { createDepartment } from '../actions'
import { toast } from 'react-hot-toast'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { DocumentData, collection, orderBy, query } from 'firebase/firestore'
import { firebaseFirestore } from '@/firebase/client'
import { departmentConverter } from '@/firebase/converters'
import dayjs from 'dayjs'
import Loader from '@/app/components/Loader'

export default function BackofficeTabDepartments() {
  const [isPending, startTransition] = useTransition()
  const [createDepartmentDialogOpen, setCreateDepartmentDialogOpen] =
    useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const [departments, isLoading] = useCollectionData(
    query(
      collection(firebaseFirestore, 'departments').withConverter(
        departmentConverter
      ),
      orderBy('createdAt')
    )
  )

  return (
    <div className="py-5">
      <div className="flex justify-end">
        <Dialog.Root
          open={createDepartmentDialogOpen}
          onOpenChange={setCreateDepartmentDialogOpen}
        >
          <Dialog.Trigger asChild>
            <button className="btn btn-primary">Create Department</button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-black/40 data-[state=open]:animate-overlayShow fixed inset-0" />
            <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[550px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
              <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                Create Department
              </Dialog.Title>

              <form
                ref={formRef}
                action={(formdata) => {
                  startTransition(async () => {
                    const { message } = await createDepartment(formdata)
                    toast.success(message)
                    setCreateDepartmentDialogOpen(false)
                    formRef.current?.reset()
                  })
                }}
                className="mt-5"
              >
                <div className="space-y-5">
                  <div className="form-control w-full">
                    <label
                      htmlFor="departmentTitle"
                      className="label font-lato"
                    >
                      <span className="label-text">Department Title</span>
                    </label>
                    <input
                      type="text"
                      id="departmentTitle"
                      name="title"
                      placeholder="Enter department title"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div className="form-control w-full">
                    <label htmlFor="departmentDesc" className="label font-lato">
                      <span className="label-text">Department Description</span>
                    </label>
                    <input
                      type="text"
                      id="departmentDesc"
                      name="description"
                      placeholder="Enter department description"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button type="submit" className="btn btn-primary">
                    {isPending && (
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
        {isLoading ? (
          <Loader />
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Department</th>
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
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
