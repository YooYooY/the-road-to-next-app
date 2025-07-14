'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { accountPasswordPath, accountProfilePath } from '@/paths'

const AccountTabs = () => {
  const pathName = usePathname()
  return (
    <Tabs value={pathName.split('/').at(-1)}>
      <TabsList>
        <TabsTrigger asChild value="profile">
          <Link href={accountProfilePath()}>Profile</Link>
        </TabsTrigger>
        <TabsTrigger asChild value="settings">
          <Link href={accountPasswordPath()}>Password</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export default AccountTabs
