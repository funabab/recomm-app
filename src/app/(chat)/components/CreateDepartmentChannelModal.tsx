'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { toast } from 'react-hot-toast'
import { RxCross2 } from 'react-icons/rx'
import { createDepartmentChannel } from '@/app/actions/departmentChannel'
import React, {
  useImperativeHandle,
  useRef,
  useState,
  useTransition,
} from 'react'
import { useUser } from '@/app/components/AuthProtect'

interface Props {
  departmentId: string
}

export interface CreateDepartmentChannelModalRef {
  showModal: () => void
}

export default React.forwardRef<CreateDepartmentChannelModalRef, Props>(
  function CreateDepartmentChannelModal({ departmentId }: Props, ref) {
    const [isPending, startTransition] = useTransition()
    const formRef = useRef<HTMLFormElement>(null)
    const [isOpen, setIsOpen] = useState(false)

    useImperativeHandle(ref, () => ({
      showModal() {
        setIsOpen(true)
      },
    }))

    const user = useUser()

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
              Create Department Channel
            </Dialog.Title>

            <form
              ref={formRef}
              action={(formdata) => {
                startTransition(async () => {
                  try {
                    const token = await user?.getIdToken()
                    const { message } = await createDepartmentChannel(
                      formdata,
                      token!
                    )
                    toast.success(message)
                    setIsOpen(false)
                    formRef.current?.reset()
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
                  <label htmlFor="channelTitle" className="label font-lato">
                    <span className="label-text">Channel Title</span>
                  </label>
                  <input
                    type="text"
                    id="channelTitle"
                    name="title"
                    placeholder="Enter channel title"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control w-full">
                  <label htmlFor="channelDesc" className="label font-lato">
                    <span className="label-text">Channel Description</span>
                  </label>
                  <input
                    type="text"
                    id="channelDesc"
                    name="description"
                    placeholder="Enter channel description"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control w-full">
                  <label htmlFor="channelType" className="label font-lato">
                    <span className="label-text">Channel Type</span>
                  </label>
                  <select id="channelType" name="type" className="select">
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
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
                  Create Channel
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
