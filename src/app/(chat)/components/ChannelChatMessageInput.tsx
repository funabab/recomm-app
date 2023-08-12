'use client'

import '../styles/channel-chat-message-box.css'
import { StarterKit } from '@tiptap/starter-kit'
import { useEditor, EditorContent } from '@tiptap/react'
import { Placeholder } from '@tiptap/extension-placeholder'
import { Link } from '@tiptap/extension-link'
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineSend,
  AiOutlineStrikethrough,
} from 'react-icons/ai'
import { twMerge } from 'tailwind-merge'
import { BsEmojiSmile } from 'react-icons/bs'
import * as Popover from '@radix-ui/react-popover'
import emojiData from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useState } from 'react'

interface Props {
  placeholder?: string
}

export default function ChannelChatMessageInput({ placeholder }: Props) {
  const [showEmojiPopup, setShowEmojiPopup] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: placeholder,
      }),
      Link,
    ],
  })
  return (
    <div className="border border-primary rounded mb-6 mx-[14px] mt-2">
      <EditorContent editor={editor} className="" />
      <div className="px-[13px] flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-x-1">
          <button
            className={twMerge(
              'py-3 px-1 text-neutral/40',
              editor?.isActive('bold') && 'text-neutral'
            )}
            onClick={() => editor?.chain().focus().toggleBold().run()}
          >
            <AiOutlineBold />
          </button>

          <button
            className={twMerge(
              'py-3 px-2 text-neutral/40',
              editor?.isActive('italic') && 'text-neutral'
            )}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
          >
            <AiOutlineItalic />
          </button>

          <button
            className={twMerge(
              'py-3 px-2 text-neutral/40',
              editor?.isActive('strike') && 'text-neutral'
            )}
            onClick={() => editor?.chain().focus().toggleStrike().run()}
          >
            <AiOutlineStrikethrough />
          </button>
        </div>

        <div className="flex flex-row items-center gap-x-2 pb-2">
          <Popover.Root open={showEmojiPopup} onOpenChange={setShowEmojiPopup}>
            <Popover.Trigger asChild>
              <button className="p-1 text-neutral">
                <BsEmojiSmile />
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                collisionPadding={{
                  right: 20,
                }}
                sideOffset={5}
              >
                <Picker
                  data={emojiData}
                  onEmojiSelect={(emoji: { native: string }) => {
                    editor?.commands.insertContent(emoji.native)
                    setShowEmojiPopup(false)
                  }}
                />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>

          <button className="btn btn-ghost btn-circle text-2xl">
            <AiOutlineSend />
          </button>
        </div>
      </div>
    </div>
  )
}
