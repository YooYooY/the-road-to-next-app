import { Ticket } from '@prisma/client'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import { LucideTrash2 } from 'lucide-react'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

type TicketMoreMenuProps = {
  ticket: Ticket
  trigger: React.ReactElement
}

const TicketMoreMenu = ({ trigger, ticket }: TicketMoreMenuProps) => {
  
  const deletButton = (
    <DropdownMenuItem>
      <LucideTrash2 className='mr-2 h-4 w-4' />
      <span>Delete</span>
    </DropdownMenuItem>
  )
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="right">
        {deletButton}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { TicketMoreMenu }
