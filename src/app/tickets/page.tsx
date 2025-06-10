import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { initialTickets } from '@/data'
import { ticketPath } from '@/paths'
import Link from 'next/link'
import { LucideFileText, LucideCheckCircle, LucidePencil } from 'lucide-react'
import { Heading } from '@/components/heading'

const TicketsPage = () => {
  const TICKET_ICONS = {
    OPEN: <LucideFileText />,
    DONE: <LucideCheckCircle />,
    IN_PROGRESS: <LucidePencil />,
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets at one place" />
      <div className="flex-1 flex flex-col gap-y-4 items-center animate-fade-in-from-top">
        {initialTickets.map((ticket) => {
          return (
            <Card key={ticket.id} className="w-full max-w-[420px]">
              <CardHeader>
                <CardTitle className="flex gap-x-2 items-center">
                  <span>{TICKET_ICONS[ticket.status]}</span>
                  <span className="truncate">{ticket.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <span className="line-clamp-3 whitespace-break-spaces">{ticket.content}</span>
              </CardContent>
              <CardFooter>
                <Link href={ticketPath(ticket.id)} className="underline">
                  View
                </Link>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default TicketsPage
