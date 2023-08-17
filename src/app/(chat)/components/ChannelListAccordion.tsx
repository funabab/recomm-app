'use client'
import React, { useRef, useState, useTransition } from 'react'
import DepartmentRoleVisible from '@/app/components/DepartmentRoleVisible'
import * as Accordion from '@radix-ui/react-accordion'
import Link from 'next/link'
import { AiFillCaretDown, AiFillPlusSquare } from 'react-icons/ai'
import { BiHash } from 'react-icons/bi'
import * as Dialog from '@radix-ui/react-dialog'
import { toast } from 'react-hot-toast'
import { RxCross2 } from 'react-icons/rx'
import { createDepartmentChannel } from '@/app/actions/department'
import { useParams } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { firebaseAuth, firebaseFirestore } from '@/firebase/client'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { and, collection, query, where } from 'firebase/firestore'
import { departmentChannelMemberConverter } from '@/firebase/converters'
import { useDepartmentValues } from './DepertmentProvider'

interface Props extends Omit<Accordion.AccordionSingleProps, 'type'> {}

export default function ChannelListAccordion(props: Props) {
  const { departmentId } = useParams()
  const [isPending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement>(null)
  const [showCreateChannelDialog, setShowCreateChannelDialog] = useState(false)
  const [user] = useAuthState(firebaseAuth)
  const { currentChannelMembership } = useDepartmentValues()

  return (
    <React.Fragment>
      <Accordion.Root {...props} defaultValue="channels" type="single">
        <Accordion.Item value="channels">
          <Accordion.Header>
            <Accordion.Trigger className="btn btn-ghost w-full rounded-none justify-start group text-[15px] font-lato font-bold text-primary no-animation">
              <AiFillCaretDown className="transition-transform duration-300 transform-gpu group-data-[state=closed]:-rotate-180" />
              Channels
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            {currentChannelMembership?.map((membership) => (
              <Link
                key={membership.id}
                href={`/chat/${membership.departmentId}/${membership.channelId}`}
                className="btn btn-ghost font-lato w-full rounded-none justify-start pl-6 text-sm min-h-0 h-10 text-neutral no-animation uppercase"
              >
                <BiHash />
                {membership.channelTitle}
              </Link>
            ))}
            <DepartmentRoleVisible roles={['admin', 'hod']}>
              <button
                className="btn btn-ghost font-lato w-full rounded-none justify-start pl-6 text-sm min-h-0 h-10 text-primary/80 no-animation"
                onClick={() => setShowCreateChannelDialog(true)}
              >
                <AiFillPlusSquare className="text-2xl" />
                Add Channel
              </button>
            </DepartmentRoleVisible>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>

      {departmentId && (
        <Dialog.Root
          open={showCreateChannelDialog}
          onOpenChange={setShowCreateChannelDialog}
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
                      setShowCreateChannelDialog(false)
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
      )}
    </React.Fragment>
  )
}
