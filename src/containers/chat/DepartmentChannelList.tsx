'use client'
import React from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import Link from 'next/link'

const DepartmentChannelList = () => {
  return (
    <Accordion.Root type="single" defaultValue="channels" collapsible>
      <Accordion.Item value="channels">
        <Accordion.Trigger className="font-bold group px-5 py-1 text-white/70 flex gap-x-1 items-center">
          <AiFillCaretDown className="group-data-[state=open]:inline-block group-data-[state=closed]:hidden" />
          <AiFillCaretUp className="group-data-[state=open]:hidden group-data-[state=closed]:inline-block" />
          <span>Channels</span>
        </Accordion.Trigger>
        <Accordion.Content>
          <Link
            href="/channel/124"
            className="py-1 pr-4 pl-8 text-sm flex items-center gap-x-2 hover:bg-white/10 bg-transparent duration-200 transition text-white/70 lowercase"
          >
            <span>#</span>
            <span>Management</span>
          </Link>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}

export default DepartmentChannelList
