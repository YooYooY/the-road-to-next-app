import { Ticket } from '@prisma/client'
import { LucideArrowUpRightFromSquare, LucideMoreVertical, LucidePencil, LucideTrash } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ticketEditPath, ticketPath } from '@/paths'
import { toCurrencyFromCent } from '@/utils/currency'
import { TICKET_ICONS } from '../constants'
// import { TicketDeleteButton } from './ticket-delete-button'
import { TicketMoreMenu } from './ticket-more-menu'

type TicketItemProps = {
  ticket: Ticket
  isDetail?: boolean
}

const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
  const detailButton = (
    <Button size="icon" variant="outline" asChild>
      <Link prefetch href={ticketPath(ticket.id)}>
        <LucideArrowUpRightFromSquare className="w-4 h-4" />
      </Link>
    </Button>
  )

  // const deleteButton = (
  //   <TicketDeleteButton
  //     ticket={ticket}
  //     trigger={
  //       <Button variant="outline" size="icon">
  //         <LucideTrash className="h-4 w-4" />
  //       </Button>
  //     }
  //   />
  // )

  const editButton = (
    <Button variant="outline" size="icon" asChild>
      <Link prefetch href={ticketEditPath(ticket.id)}>
        <LucidePencil className="h-4 w-4" />
      </Link>
    </Button>
  )

  const moreMenu = (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <LucideMoreVertical className="h-4 w-4" />
        </Button>
      }
    />
  )

  return (
    <div
      className={cn('w-full flex gap-x-1', {
        'max-w-[580px]': isDetail,
        'max-w-[420px]': !isDetail,
      })}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex gap-x-2 items-center">
            <span>{TICKET_ICONS[ticket.status]}</span>
            <span className="truncate">{ticket.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span className={cn('whitespace-break-spaces', { 'line-clamp-3': !isDetail })}>{ticket.content}</span>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">{ticket.deadline}</p>
          <p className="text-sm text-muted-foreground">{toCurrencyFromCent(ticket.bounty)}</p>
        </CardFooter>
      </Card>

      <div className="flex flex-col gap-y-1">
        {isDetail ? (
          <>
            {editButton}
            {/* {deleteButton} */}
            {moreMenu}
          </>
        ) : (
          <>
            {detailButton}
            {editButton}
          </>
        )}
      </div>
    </div>
  )
}

export { TicketItem }
