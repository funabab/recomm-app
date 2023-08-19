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
import { useRef, useState } from 'react'
import clsx from 'clsx'

type Reference = { label: string; value: string }
interface Props {
  placeholder?: string
  references?: Reference[]
  onSendMessage?: (message: string, reference?: string) => void
  disabled?: boolean
}

export default function ChannelChatMessageInput({
  placeholder,
  references,
  onSendMessage,
  disabled = false,
}: Props) {
  const [showEmojiPopup, setShowEmojiPopup] = useState(false)
  const referenceRef = useRef<HTMLSelectElement>(null)

  const editor = useEditor({
    editable: !disabled,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: placeholder,
        showOnlyWhenEditable: false,
      }),
      Link,
    ],
  })
  return (
    <div
      className={twMerge(
        'border border-primary rounded mb-6 mx-[14px] mt-2',
        disabled && 'opacity-60 border-primary/40'
      )}
    >
      <EditorContent editor={editor} />
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
          {references && (
            <select className="select select-sm" ref={referenceRef}>
              {references.map((ref) => (
                <option key={ref.value} value={ref.value}>
                  {ref.label}
                </option>
              ))}
            </select>
          )}

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

          <button
            className="btn btn-ghost btn-circle text-2xl outline-none"
            onClick={() => {
              const content = editor!.getHTML()
              editor?.commands.clearContent()

              onSendMessage?.(
                content,
                references && referenceRef.current!.value
              )
            }}
          >
            <AiOutlineSend />
          </button>
        </div>
      </div>
    </div>
  )
}
