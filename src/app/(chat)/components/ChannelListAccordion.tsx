'use client'
import * as Accordion from '@radix-ui/react-accordion'
import Link from 'next/link'
import { AiFillCaretDown, AiFillPlusSquare } from 'react-icons/ai'
import { BiHash } from 'react-icons/bi'

interface Props extends Omit<Accordion.AccordionSingleProps, 'type'> {}

export default function ChannelListAccordion(props: Props) {
  return (
    <Accordion.Root {...props} defaultValue="channels" type="single">
      <Accordion.Item value="channels">
        <Accordion.Header>
          <Accordion.Trigger className="btn btn-ghost w-full rounded-none justify-start group text-[15px] font-lato font-bold text-primary">
            <AiFillCaretDown className="transition-transform duration-300 transform-gpu group-data-[state=closed]:-rotate-180" />
            Channels
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          <Link
            href="#"
            className="btn btn-ghost font-lato w-full rounded-none justify-start pl-6 text-sm min-h-0 h-10 text-neutral"
          >
            <BiHash />
            Channel
          </Link>
          <button className="btn btn-ghost font-lato w-full rounded-none justify-start pl-6 text-sm min-h-0 h-10 text-primary/80">
            <AiFillPlusSquare className="text-2xl" />
            Add Channel
          </button>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}
