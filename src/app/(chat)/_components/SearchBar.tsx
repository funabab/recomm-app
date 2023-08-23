'use client'

import { BiSearch } from 'react-icons/bi'
import { useMemo, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { collection, query, where } from 'firebase/firestore'
import { firebaseFirestore } from '@/firebase/client'
import {
  departmentChannelConverter,
  departmentConverter,
} from '@/firebase/converters'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useRouter } from 'next/navigation'
import { useDepartmentValues } from './DepertmentProvider'

export default function SearchBar() {
  const [openDropdown, setOpenDropdown] = useState(false)
  const [filter, setFilter] = useState('')
  const router = useRouter()
  const { currentDepartment } = useDepartmentValues()
  const [departmentChannels] = useCollectionData(
    currentDepartment
      ? query(
          collection(firebaseFirestore, 'departmentChannels'),
          where('departmentId', '==', currentDepartment?.id)
        ).withConverter(departmentChannelConverter)
      : null
  )

  const filteredDepartmentChannels = useMemo(
    () =>
      filter
        ? departmentChannels?.filter((department) =>
            department.title.toLowerCase().includes(filter)
          )
        : departmentChannels,
    [departmentChannels, filter]
  )

  return (
    <div className="flex-1">
      <Popover open={openDropdown} onOpenChange={setOpenDropdown}>
        <PopoverTrigger asChild>
          <div className="relative max-w-[500px] lg:ml-24">
            <input
              type="search"
              className="input input-bordered flex-1 bg-transparent text-[13px] h-6 w-full text-center placeholder-gray-500 peer font-lato"
              placeholder="Search Channel"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <BiSearch className="absolute left-1/2 top-1/2 -translate-y-1 h-3 text-gray-500 -translate-x-[70px] hidden peer-placeholder-shown:inline-block" />
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-[450px] bg-base-100 max-w-[95vw] p-0"
          align="start"
          sideOffset={0}
        >
          <Command>
            <CommandInput
              placeholder="Search Channel"
              value={filter}
              onValueChange={setFilter}
            />
            {filteredDepartmentChannels?.length === 0 && (
              <CommandEmpty>No channel found</CommandEmpty>
            )}
            <CommandGroup>
              {filteredDepartmentChannels?.map((departmentChannel) => (
                <CommandItem
                  key={departmentChannel.id}
                  onSelect={() =>
                    router.push(
                      `/chat/${departmentChannel.departmentId}/${departmentChannel.id}`
                    )
                  }
                >
                  # {departmentChannel.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
