import { Ticket, TicketStatus } from '@prisma/client'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import { LucideTrash2 } from 'lucide-react'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TICKET_STATUS_LABELS } from '../constants'

type TicketMoreMenuProps = {
  ticket: Ticket
  trigger: React.ReactElement
}

const TicketMoreMenu = ({ trigger, ticket }: TicketMoreMenuProps) => {
  const deletButton = (
    <DropdownMenuItem>
      <LucideTrash2 className="mr-2 h-4 w-4" />
      <span>Delete</span>
    </DropdownMenuItem>
  )

  const ticketStatusRadioGroupItems = (
    <DropdownMenuRadioGroup value={ticket.status}>
      {(Object.keys(TICKET_STATUS_LABELS) as Array<TicketStatus>).map((key) => (
        <DropdownMenuRadioItem key={key} value={key}>
          {TICKET_STATUS_LABELS[key]}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="right">
        {ticketStatusRadioGroupItems}
        <DropdownMenuSeparator />
        {deletButton}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { TicketMoreMenu }
