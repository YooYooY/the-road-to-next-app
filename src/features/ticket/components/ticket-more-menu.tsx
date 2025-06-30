'use client';
import { Ticket, TicketStatus } from '@prisma/client'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import { LucideTrash2 } from 'lucide-react'
import { toast } from 'sonner'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { updateTicketStatus } from '../actions/update-ticket-status'
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

  const handleUpdateTicketStatus = async (value: string) => {
    const result = await updateTicketStatus(ticket.id, value as TicketStatus)

    if (result.status === 'ERROR') {
      return toast.error(result.message)
    }

    if (result.status === 'SUCCESS') {
      return toast.success(result.message)
    }
  }

  const ticketStatusRadioGroupItems = (
    <DropdownMenuRadioGroup value={ticket.status} onValueChange={handleUpdateTicketStatus}>
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
