import { Ticket } from '@prisma/client'
import { SubmitButton } from '@/components/form/submit-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { upsertTicket } from '../actions/upsert-ticket'

type TicketUpsertFormProps = {
  ticket?: Ticket
}

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  return (
    <form action={upsertTicket.bind(null, ticket?.id)} className="flex flex-col gap-y-2">
      <Label htmlFor="title">Title</Label>
      <Input id="title" name="title" defaultValue={ticket?.title} />
      <Label htmlFor="content">Content</Label>Add commentMore actions
      <Textarea id="content" name="content" defaultValue={ticket?.content} />
      <SubmitButton label={ticket ? 'Edit' : 'Create'}></SubmitButton>
    </form>
  )
}

export { TicketUpsertForm }
