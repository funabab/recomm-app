import IconChat from '@/app/components/icons/IconChat'

export default function ChatHome() {
  return (
    <div className="w-full h-full justify-center items-center font-lato flex flex-col gap-y-2">
      <IconChat className="h-40" />
      <h2 className="text-2xl font-bold text-neutral mt-5">Recomm App</h2>
      <p>
        You can engage in your departmental conversations in available channels
      </p>
    </div>
  )
}
