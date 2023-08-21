'use client'
import React, { useRef } from 'react'
import DepartmentRoleVisible from '@/app/components/DepartmentRoleVisible'
import * as Accordion from '@radix-ui/react-accordion'
import Link from 'next/link'
import { AiFillCaretDown, AiFillPlusSquare } from 'react-icons/ai'
import { BiHash } from 'react-icons/bi'
import { useParams } from 'next/navigation'
import { useDepartmentValues } from './DepertmentProvider'
import CreateDepartmentChannelModal, {
  CreateDepartmentChannelModalRef,
} from './CreateDepartmentChannelModal'

interface Props extends Omit<Accordion.AccordionSingleProps, 'type'> {}

export default function ChannelListAccordion(props: Props) {
  const { departmentId } = useParams()
  const { currentChannelMembership } = useDepartmentValues()
  const createChannelDialogRef = useRef<CreateDepartmentChannelModalRef>(null)

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
                className="btn btn-ghost btn-sm font-lato w-full rounded-none justify-start pl-6 text-xs min-h-0 h-10 text-neutral no-animation uppercase"
              >
                <BiHash />
                {membership.channelTitle}
              </Link>
            ))}
            <DepartmentRoleVisible roles={['admin', 'hod']}>
              <button
                className="btn btn-ghost font-lato w-full rounded-none justify-start pl-6 text-sm min-h-0 h-10 text-primary/80 no-animation"
                onClick={() => createChannelDialogRef.current?.showModal()}
              >
                <AiFillPlusSquare className="text-2xl" />
                Add Channel
              </button>
            </DepartmentRoleVisible>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>

      {departmentId && (
        <CreateDepartmentChannelModal
          ref={createChannelDialogRef}
          departmentId={departmentId}
        />
      )}
    </React.Fragment>
  )
}
