import { Suspense } from 'react'
import { CardCompact } from '@/components/card-compact'
import { Heading } from '@/components/heading'
import { Spinner } from '@/components/spinner'
import { getAuth } from '@/features/auth/queries/get-auth'
import { TicketList } from '@/features/ticket/components/ticket-list'
import { TicketUpsertForm } from '@/features/ticket/components/ticket-upsert-form'

const TicketsPage = async () => {
  const { user } = await getAuth()

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="My Tickets" description="All your tickets at one place" />

      <CardCompact
        title="Create Ticket"
        description="Create a new ticket"
        className="w-full max-w-[420px] self-center"
        content={<TicketUpsertForm />}
      />

      <Suspense fallback={<Spinner />}>
        <TicketList userId={user?.id} />
      </Suspense>
    </div>
  )
}

export default TicketsPage
