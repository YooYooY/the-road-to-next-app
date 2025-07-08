'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { setCookieByKey } from '@/actions/cookies'
import { fromErrorToActionState, toActionState } from '@/components/form/utils/to-action-state'
import { checkTicketOwner } from '@/features/auth/utils/checkTicketOwner'
import { prisma } from '@/lib/prisma'
import { ticketsPath } from '@/paths'

export const deleteTicket = async (id: string) => {
  try {
    
    const isTicketOwner = await checkTicketOwner(id)
    
    if (!isTicketOwner) {
      return toActionState('ERROR', 'Not authorized')
    }
        
    await prisma.ticket.delete({
      where: {
        id,
      },
    })
  } catch (error) {
    return fromErrorToActionState(error)
  }

  revalidatePath(ticketsPath())
  setCookieByKey('toast', 'Ticket deleted successfully')
  redirect(ticketsPath())
}
