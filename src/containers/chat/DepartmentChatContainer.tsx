import AvaterIcon from '@/components/AvaterIcon'
import React from 'react'
import {
  AiOutlineInfoCircle,
  AiOutlineStar,
  AiOutlineUserAdd,
} from 'react-icons/ai'
import { MdOutlineAddReaction } from 'react-icons/md'
import ChatMessageBox from './ChatMessageBox'

interface Props {}

const DepartmentChatContainer: React.FC<Props> = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="py-[15px] px-[22px] border-b border-[#C4C4C4] shrink-0 flex justify-between items-center">
        <div>
          <div className="flex gap-x-[6px] items-center">
            <h2 className="font-lato text-[15px] text-[#1D1C1D] font-extrabold">
              # uxui_design
            </h2>
            <button>
              <AiOutlineStar />
            </button>
          </div>
          <p className="mt-[5px] font-lato font-medium text-[#6F6F6F] text-[13px]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea, enim.
          </p>
        </div>

        <div className="flex flex-row items-center">
          <p className="font-lato text-[13px] font-semibold text-black">
            493 Members
          </p>
          <button className="text-[#606060] ml-7 text-xl">
            <AiOutlineUserAdd />
          </button>

          <button className="ml-[22px] text-[#606060] text-xl">
            <AiOutlineInfoCircle />
          </button>
        </div>
      </div>

      <div className="grow flex flex-col min-h-0 relative">
        <div className="grow overflow-y-auto">
          <div className="py-[17px] px-[19px] border-b border-b-[#DFDFDF] last:border-b-transparent">
            <div className="flex flex-row">
              <AvaterIcon />
              <article className="flex-1 font-lato ml-[7px]">
                <div className="flex items-center gap-x-1">
                  <strong className="text-[#1D1C1D] text-[15px] font-extrabold">
                    Hyejin
                  </strong>
                  <span className="text-[#6F6F6F] text-xs">6:49 PM</span>
                </div>
                <p className="mt-2 text-[15px]">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Corrupti, aut laudantium distinctio accusamus accusantium nemo
                  eum odio ut ipsa tempora quia, laborum iusto. Ipsam laudantium
                  reprehenderit consequuntur id corrupti voluptate est dolorum
                  eum nisi corporis, earum aliquam blanditiis, non magnam ea
                  consequatur totam. Repellendus tempora consequatur voluptates
                  doloremque reprehenderit id nesciunt eum dolores cumque
                  doloribus, quaerat ipsum harum cum repellat dolore aut vero
                  ullam. Minus suscipit pariatur quia consequatur illo harum,
                  labore tempore repudiandae ex nostrum sunt vitae perferendis
                  architecto debitis, dolore quidem ab consequuntur incidunt
                  distinctio voluptatibus. Explicabo consectetur odio beatae
                  placeat ipsum, excepturi voluptas. Aliquid beatae omnis
                  necessitatibus.
                </p>
                <div className="mt-2">
                  <button className="bg-[#EFEFEF] text-[#5B5B5B]  w-9 h-6 rounded-full flex justify-center items-center hover:opacity-70 duration-300 transition">
                    <MdOutlineAddReaction />
                  </button>
                </div>
              </article>
            </div>
          </div>
        </div>
        <ChatMessageBox />
      </div>
    </div>
  )
}

export default DepartmentChatContainer
