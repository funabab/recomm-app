'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { toast } from 'react-hot-toast'
import { RxCross2 } from 'react-icons/rx'
import React, {
  useImperativeHandle,
  useRef,
  useState,
  useTransition,
} from 'react'
import { inviteMemberToDepartment } from '@/app/actions/department'

interface Props {
  departmentId: string
}

export interface InviteMemberToDepartmentModalRef {
  showModal: () => void
}

export default React.forwardRef<InviteMemberToDepartmentModalRef, Props>(
  function InviteMemberToDepartmentModal({ departmentId }: Props, ref) {
    const [isPending, startTransition] = useTransition()
    const formRef = useRef<HTMLFormElement>(null)
    const [isOpen, setIsOpen] = useState(false)

    useImperativeHandle(ref, () => ({
      showModal() {
        setIsOpen(true)
      },
    }))

    return (
      <Dialog.Root
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open)
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/40 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[550px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
              Invite Member to Department
            </Dialog.Title>

            <form
              ref={formRef}
              action={(formdata) => {
                startTransition(async () => {
                  try {
                    const { message } = await inviteMemberToDepartment(formdata)
                    toast.success(message)
                    formRef.current?.reset()
                    setIsOpen(false)
                  } catch (e) {
                    const err = e as Error
                    toast.error(err.message)
                  }
                })
              }}
              className="mt-5"
            >
              <input type="hidden" name="department" value={departmentId} />
              <div className="space-y-5">
                <div className="form-control w-full">
                  <label htmlFor="memberFullname" className="label font-lato">
                    <span className="label-text">Fullname</span>
                  </label>
                  <input
                    type="text"
                    id="memberFullname"
                    name="fullname"
                    placeholder="Enter member fullname"
                    autoComplete="name"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control w-full">
                  <label htmlFor="memberEmail" className="label font-lato">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    id="memberEmail"
                    name="email"
                    placeholder="Enter member email"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isPending}
                >
                  {isPending && (
                    <span className="loading loading-spinner"></span>
                  )}
                  Send Invitation
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
    )
  }
)
