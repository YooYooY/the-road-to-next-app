'use client'
import { Ticket, TicketStatus } from '@prisma/client'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import { LucideTrash, LucideTrash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useConfirmDialog } from '@/components/confirm-dialog'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { deleteTicket } from '../actions/delete-ticket'
import { updateTicketStatus } from '../actions/update-ticket-status'
import { TICKET_STATUS_LABELS } from '../constants'

type TicketMoreMenuProps = {
  ticket: Ticket
  trigger: React.ReactElement
}

const TicketMoreMenu = ({ trigger, ticket }: TicketMoreMenuProps) => {
  
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteTicket.bind(null, ticket.id),
    trigger:(
      <DropdownMenuItem>
        <LucideTrash className="mr-2 h-4 w-4" />
        <span>Delete</span>
      </DropdownMenuItem>
    )
  })

  const handleUpdateTicketStatus = async (value: string) => {
    const promise = updateTicketStatus(ticket.id, value as TicketStatus)

    toast.promise(promise, {
      loading: 'Updating status...',
    })

    const result = await promise

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
    <>
      {deleteDialog}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" side="right">
          {ticketStatusRadioGroupItems}
          <DropdownMenuSeparator />
          {deleteButton}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export { TicketMoreMenu }
