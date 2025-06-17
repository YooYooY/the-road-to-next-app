import { Suspense } from 'react'
import { CardCompact } from '@/components/card-compact'
import { Heading } from '@/components/heading'
import { Spinner } from '@/components/spinner'
import { TicketCreateForm } from '@/features/ticket/components/ticket-create-form'
import { TicketList } from '@/features/ticket/components/ticket-list'

const TicketsPage = async () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets at one place" />

      <CardCompact
        title="Create Ticket"
        description="Create a new ticket"
        className="w-full max-w-[420px] self-center"
        content={<TicketCreateForm />}
      ></CardCompact>

      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  )
}

export default TicketsPage
