import { prisma } from '@/lib/prisma'
import { Ticket } from '../types'

export const getTicket = async (id: string): Promise<Ticket | null> => {
  return await prisma.ticket.findUnique({
    where: {
      id,
    },
  })
}
