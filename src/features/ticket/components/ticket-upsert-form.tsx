'use client'

import { Ticket } from '@prisma/client'
import { useActionState, useRef, useState } from 'react'
import { DatePicker } from '@/components/date-picker'
import { FieldError } from '@/components/form/field-error'
import { Form } from '@/components/form/form'
import { SubmitButton } from '@/components/form/submit-button'
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { fromCent } from '@/utils/currency'
import { upsertTicket } from '../actions/upsert-ticket'

type TicketUpsertFormProps = {
  ticket?: Ticket
}

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [actionState, action] = useActionState(upsertTicket.bind(null, ticket?.id), EMPTY_ACTION_STATE)

  const [timestamp, setTimestamp] = useState(Date.now())

  const datePickerImperativeHandleRef = useRef<{
    reset: () => void
  }>(null)

  const handleSuccess = () => {
    // setTimestamp(Date.now())
    datePickerImperativeHandleRef.current?.reset()
  }

  return (
    <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
      <Label htmlFor="title">Title</Label>
      <Input id="title" name="title" defaultValue={(actionState.payload?.formData.get('title') as string) || ticket?.title} />
      <FieldError name="title" actionState={actionState} />

      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        defaultValue={(actionState.payload?.formData.get('content') as string) || ticket?.content}
      />
      <FieldError name="content" actionState={actionState} />

      <div className="flex gap-x-2 mb-1">
        <div className="w-1/2">
          <Label htmlFor="deadline">Deadline</Label>
          <DatePicker
            id="deadline"
            name="deadline"
            defaultValue={ticket?.deadline}
            imperativeHandleRef={datePickerImperativeHandleRef}
          />
          <FieldError actionState={actionState} name="deadline" />
        </div>
        <div className="w-1/2">
          <Label htmlFor="bounty">Bounty ($)</Label>
          <Input
            type="number"
            id="bounty"
            name="bounty"
            step=".01"
            defaultValue={ticket?.bounty ? fromCent(ticket.bounty) : ''}
          />
          <FieldError actionState={actionState} name="bounty" />
        </div>
      </div>

      <SubmitButton label={ticket ? 'Edit' : 'Create'}></SubmitButton>
    </Form>
  )
}

export { TicketUpsertForm }
