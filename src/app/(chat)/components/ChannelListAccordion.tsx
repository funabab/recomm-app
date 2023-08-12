'use client'
import * as Accordion from '@radix-ui/react-accordion'
import Link from 'next/link'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import { BiHash } from 'react-icons/bi'

export default function ChannelListAccordion(
  props: Omit<Accordion.AccordionSingleProps, 'type'>
) {
  return (
    <Accordion.Root {...props} defaultValue="channels" type="single">
      <Accordion.Item value="channels">
        <Accordion.Header>
          <Accordion.Trigger className="btn btn-ghost w-full rounded-none justify-start group text-[15px] font-lato font-bold text-neutral-700">
            <AiFillCaretDown className="hidden group-data-[state=open]:inline-block" />
            <AiFillCaretUp className="hidden group-data-[state=closed]:inline-block" />
            Channels
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          <Link
            href=""
            className="btn btn-ghost font-lato w-full rounded-none justify-start pl-6 text-sm min-h-0 h-10 text-neutral-500"
          >
            <BiHash />
            Channel
          </Link>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}
