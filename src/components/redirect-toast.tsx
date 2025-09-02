'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { deleteCookieByKey, getCookieByKey } from '@/actions/cookies'

const RedirectToast = () => {
  const pathname = usePathname()

  useEffect(() => {
    const fetchCookieToast = async () => {
      const message = await getCookieByKey('toast')

      if (message) {
        await deleteCookieByKey('toast')
        toast.success(message)
      }
    }

    fetchCookieToast()
  }, [pathname])

  return null
}

export { RedirectToast }
