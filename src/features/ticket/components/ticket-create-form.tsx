import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createTicket } from '../actions/create-ticket'

const TicketCreateForm = () => {
  return (
    <form action={createTicket} className="flex flex-col gap-y-2">
      <Label htmlFor="title">title</Label>
      <Input id="title" name="title" type="text"></Input>

      <Label htmlFor="content">content</Label>
      <Input id="content" name="content" type="text"></Input>

      <Button type="submit">Create</Button>
    </form>
  )
}

export { TicketCreateForm }
