'use client'

import { Heading } from '@/components/heading'
import { TicketItem } from '@/features/ticket/components/ticket-item'
import { useEffect, useState } from 'react'
import { Ticket } from '@/features/ticket/types'
import { getTickets } from '@/features/ticket/queries/get-tickets'

const TicketsPage = () => {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchTickets = async () => {
      setIsLoading(true)
      const result = await getTickets()
      setTickets(result)
      setIsLoading(false)
    }

    fetchTickets()
  }, [])

  if (isLoading) {
    return <div className='flex justify-center'>Loading...</div>
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets at one place" />
      <div className="flex-1 flex flex-col gap-y-4 items-center animate-fade-in-from-top">
        {tickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  )
}

export default TicketsPage
