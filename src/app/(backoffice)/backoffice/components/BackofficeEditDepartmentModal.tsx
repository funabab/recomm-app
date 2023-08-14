import { useEffect, useRef, useState, useTransition } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { editDepartment } from '@/app/actions/department'
import { toast } from 'react-hot-toast'
import { RxCross2 } from 'react-icons/rx'
import { Department } from '@/typings'

interface Props extends Dialog.DialogProps {
  department?: Department
  dialogTrigger?: React.ReactNode
}

export default function BackofficeEditDepartmentModal({
  department,
  dialogTrigger,
  open,
  ...props
}: Props) {
  const [EditDepartmentDialogOpen, setEditDepartmentDialogOpen] =
    useState(false)
  const [isPending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    setEditDepartmentDialogOpen(Boolean(department))
  }, [department])

  useEffect(() => {
    setEditDepartmentDialogOpen(Boolean(open))
  }, [open])

  return (
    <Dialog.Root
      {...props}
      open={EditDepartmentDialogOpen}
      onOpenChange={(open) => {
        setEditDepartmentDialogOpen(open)
        props.onOpenChange?.(open)
      }}
    >
      {dialogTrigger && (
        <Dialog.Trigger asChild>{dialogTrigger}</Dialog.Trigger>
      )}
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/40 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[550px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Edit Department
          </Dialog.Title>

          <form
            ref={formRef}
            action={(formdata) => {
              startTransition(async () => {
                const { message } = await editDepartment(formdata)
                toast.success(message)
                setEditDepartmentDialogOpen(false)
                formRef.current?.reset()
              })
            }}
            className="mt-5"
          >
            <input type="hidden" name="departmentId" value={department?.id} />
            <div className="space-y-5">
              <div className="form-control w-full">
                <label htmlFor="departmentTitle" className="label font-lato">
                  <span className="label-text">Department Title</span>
                </label>
                <input
                  type="text"
                  id="departmentTitle"
                  name="title"
                  defaultValue={department?.title}
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
                  defaultValue={department?.description}
                  placeholder="Enter department description"
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
                {isPending && <span className="loading loading-spinner"></span>}
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
  )
}
