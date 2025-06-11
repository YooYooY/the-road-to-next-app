import { initialTickets } from '@/data'
import { TicketItem } from '@/features/ticket/components/ticket-item'

type TicketPageProps = {
  params: {
    ticketId: string
  }
}

const TicketPage = ({ params }: TicketPageProps) => {
  const ticket = initialTickets.find((ticket) => {
    return ticket.id === params.ticketId
  })

  if (!ticket) {
    return <h2 className="text-lg">Ticket not found</h2>
  }

  return (
    <div className='flex justify-center animate-fade-in-from-top'>
      <TicketItem ticket={ticket} isDetail />
    </div>
  )
}

export default TicketPage
