import { LiaEdit } from 'react-icons/lia'
import ChannelButton from '../../../components/ChannelButton'
import { AiOutlineComment, AiOutlineFile } from 'react-icons/ai'
import ChannelListAccordion from '../../../components/ChannelListAccordion'
import DepartmentRoleVisible from '@/app/components/DepartmentRoleVisible'

export default function DepartmentNavigation() {
  return (
    <div className="w-[262px]">
      <div className="py-2 px-3 border-b border-neutral-content flex justify-between items-center max-w-full">
        <ChannelButton />

        <DepartmentRoleVisible roles={['admin', 'hod']}>
          <button className="btn btn-circle btn-accent text-xl text-primary shrink-0">
            <LiaEdit />
          </button>
        </DepartmentRoleVisible>
      </div>

      <div>
        <button className="btn btn-ghost font-lato font-bold text-[15px] w-full justify-start rounded-none text-primary no-animation">
          <AiOutlineComment />
          Notice Board
        </button>
        <button className="btn btn-ghost font-lato font-bold text-[15px] w-full justify-start rounded-none text-primary no-animation">
          <AiOutlineFile />
          Resources
        </button>

        <ChannelListAccordion collapsible />
      </div>
    </div>
  )
}
