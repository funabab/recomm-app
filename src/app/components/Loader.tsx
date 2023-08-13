import { ThreeDots } from 'react-loader-spinner'

export default function Loader() {
  return (
    <div className="flex justify-center items-center py-10">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  )
}

export function LoaderScreen() {
  return (
    <div className="bg-base-100 w-full h-full fixed inset-0 flex justify-center items-center">
      <Loader />
    </div>
  )
}
