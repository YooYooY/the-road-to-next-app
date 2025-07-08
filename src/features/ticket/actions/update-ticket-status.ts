'use server'
import { TicketStatus } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { fromErrorToActionState, toActionState } from '@/components/form/utils/to-action-state'
import { checkTicketOwner } from '@/features/auth/utils/checkTicketOwner'
import { prisma } from '@/lib/prisma'
import { ticketsPath } from '@/paths'

export const updateTicketStatus = async (id: string, status: TicketStatus) => {
  try {
    const isTicketOwner = await checkTicketOwner(id)

    if (!isTicketOwner) {
      return toActionState('ERROR', 'Not authorized')
    }

    await prisma.ticket.update({
      where: {
        id,
      },
      data: {
        status,
      },
    })
  } catch (error) {
    return fromErrorToActionState(error)
  }

  revalidatePath(ticketsPath())

  return toActionState('SUCCESS', 'Ticket status updated successfully')
}
