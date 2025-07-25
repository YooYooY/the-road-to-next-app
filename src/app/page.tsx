import { Suspense } from 'react'
import { Heading } from '@/components/heading'
import { Spinner } from '@/components/spinner'
import { TicketList } from '@/features/ticket/components/ticket-list'
import { SearchParams } from 'nuqs/server'
import { searchParamsCache } from '@/features/ticket/search-params'

type HomePageProps = {
  searchParams: SearchParams
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  
  const qs = await searchParamsCache.parse(searchParams)
    
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="All Tickets" description="Tickets by everyone at one place" />
      <Suspense fallback={<Spinner />}>
        <TicketList searchParams={qs} />
      </Suspense>
    </div>
  )
}

export default HomePage
