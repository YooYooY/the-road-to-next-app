import { notFound } from 'next/navigation'
import { CardCompact } from '@/components/card-compact'
import { getAuth } from '@/features/auth/queries/get-auth'
import { TicketUpsertForm } from '@/features/ticket/components/ticket-upsert-form'
import { getTicket } from '@/features/ticket/queries/get-ticket'
import { isOwner } from '@/utils/is-owner'

type TicketEditPageProps = {
  params: {
    ticketId: string
  }
}

const TicketEditPage = async ({ params }: TicketEditPageProps) => {
  const { user } = await getAuth()
  const ticket = await getTicket(params.ticketId)

  const isTicketFound = !!ticket
  const isTicektOwner = isOwner(user, ticket)

  if (!isTicketFound || !isTicektOwner) {
    notFound()
  }

 

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="Edit Ticket"
        description="Edit an existing ticket"
        className="w-full max-w-[420px] animate-fade-in-from-top"
        content={<TicketUpsertForm ticket={ticket} />}
      />
    </div>
  )
}

export default TicketEditPage
