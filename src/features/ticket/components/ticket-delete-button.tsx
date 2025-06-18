'use client'
import { Ticket } from '@prisma/client'
import { deleteTicket } from '../actions/delete-ticket'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { LucideLoader2 } from 'lucide-react'

type TicketDeleteButtonProps = {
  ticket: Ticket
  trigger: React.ReactElement
}

// const TicketDeleteButton = ({ ticket, trigger }: TicketDeleteButtonProps) => {
//   return <form action={deleteTicket.bind(null, ticket?.id)}>{trigger}</form>
// }

const TicketDeleteButton = ({ ticket, trigger }: TicketDeleteButtonProps) => {
  const [loading, setLoading] = useState(false)
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    setLoading(true)
    await deleteTicket(ticket?.id)
    setLoading(false)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>This action will permanently delete 「{ticket.title}」.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={handleDelete}>
            {loading && <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />}
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { TicketDeleteButton }
