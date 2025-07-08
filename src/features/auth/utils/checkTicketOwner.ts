import { prisma } from '@/lib/prisma'
import { isOwner } from '@/utils/is-owner'
import { getAuthOrRedirect } from '../queries/get-auth-or-redirect'

export const checkTicketOwner = async (ticketId: string) => {
  const { user } = await getAuthOrRedirect()

  const ticket = await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
  })

  if (!ticket || !isOwner(user, ticket)) {
    return false
  }

  return true
}
