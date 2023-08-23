'use client'

import 'nprogress/nprogress.css'
import { usePathname, useSearchParams } from 'next/navigation'
import nProgress from 'nprogress'
import { useLayoutEffect } from 'react'

export default function RouteProgressbar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useLayoutEffect(() => {
    nProgress.done()
    return () => {
      nProgress.start()
    }
  }, [pathname, searchParams])
  return null
}
