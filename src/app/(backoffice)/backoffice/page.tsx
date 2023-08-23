import BackofficeTabs from './_components/BackofficeTabs'

export default function Backoffice() {
  return (
    <main>
      <header className="border-b border-b-neutral-content">
        <h1 className="py-4 md:text-xl container mx-auto uppercase px-2 font-lato font-bold">
          Recomm Backoffice
        </h1>
      </header>

      <div className="px-2 container mx-auto mt-5">
        <BackofficeTabs />
      </div>
    </main>
  )
}
