import { notFound } from 'next/navigation'
import { getAuth } from '@/features/auth/queries/get-auth'
import { TicketItem } from '@/features/ticket/components/ticket-item'
import { getTicket } from '@/features/ticket/queries/get-ticket'
import { isOwner } from '@/utils/is-owner'

type TicketPageProps = {
  params: {
    ticketId: string
  }
}

const TicketPage = async ({ params }: TicketPageProps) => {
  const { user } = await getAuth()

  const ticket = await getTicket(params.ticketId)

  const isTicketFound = !!ticket
  const isTicektOwner = isOwner(user, ticket)

  if (!isTicketFound || !isTicektOwner) {
    notFound()
  }

  return (
    <div className="flex justify-center animate-fade-in-from-top">
      <TicketItem ticket={ticket} isDetail />
    </div>
  )
}

export default TicketPage
