'use client'
import React, { useCallback, useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineOrderedList,
  AiOutlineStrikethrough,
  AiOutlineUnorderedList,
} from 'react-icons/ai'
import { BsCodeSlash, BsEmojiSmile, BsLink45Deg } from 'react-icons/bs'
import * as Popover from '@radix-ui/react-popover'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import { MdSend } from 'react-icons/md'

const ChatMessageBox = () => {
  const [emojiPopupOpen, setEmojiPopupOpen] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Message # uxui_design',
      }),
    ],
  })

  const handleOnPickEmoji = useCallback(
    (data: { native: string }) => {
      editor?.commands.insertContent(data.native)
      setEmojiPopupOpen(false)
    },
    [editor]
  )

  return (
    <div className="border border-[#939393] rounded mx-[14px] shrink-0 mb-6">
      <EditorContent
        editor={editor}
        className="w-full h-20 [&_.ProseMirror]:outline-none [&_.ProseMirror]:p-[11px] font-lato text-[15px] text-black"
      />
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-x-1 p-2">
          <button className="p-1 disabled:text-[#E2E2E2]" disabled>
            <AiOutlineBold />
          </button>

          <button className="p-1 disabled:text-[#E2E2E2]" disabled>
            <AiOutlineItalic />
          </button>

          <button className="p-1 disabled:text-[#E2E2E2]" disabled>
            <AiOutlineStrikethrough />
          </button>

          <button className="p-1 disabled:text-[#E2E2E2]" disabled>
            <BsCodeSlash />
          </button>

          <button className="p-1 disabled:text-[#E2E2E2]" disabled>
            <BsLink45Deg />
          </button>

          <button className="p-1 disabled:text-[#E2E2E2]" disabled>
            <AiOutlineOrderedList />
          </button>

          <button className="p-1 disabled:text-[#E2E2E2]" disabled>
            <AiOutlineUnorderedList />
          </button>

          <button className="p-1 disabled:text-[#E2E2E2]" disabled>
            <AiOutlineUnorderedList />
          </button>
        </div>

        <div className="p-2 flex items-center gap-x-1">
          <Popover.Root onOpenChange={setEmojiPopupOpen} open={emojiPopupOpen}>
            <Popover.Trigger asChild>
              <button className="p-1">
                <BsEmojiSmile />
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content sideOffset={5}>
                <Picker
                  data={data}
                  onEmojiSelect={handleOnPickEmoji}
                  theme="light"
                />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>

          <button className="p-1 text-xl">
            <MdSend />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatMessageBox
