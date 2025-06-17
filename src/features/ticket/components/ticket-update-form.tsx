import { Ticket } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { updateTicket } from '../actions/update-ticket'

const TicketUpdateForm = ({ ticket }: { ticket: Ticket }) => {
  return (
    <form action={updateTicket.bind(null, ticket.id)} className="flex flex-col gap-y-2">
      <Label htmlFor="title">Title</Label>
      <Input id="title" name="title" defaultValue={ticket.title} />
      
      <Label htmlFor="content">Content</Label>Add commentMore actions
      <Textarea id="content" name="content" defaultValue={ticket.content} />
      
      <Button type="submit">Update</Button>
    </form>
  )
}

export { TicketUpdateForm }
