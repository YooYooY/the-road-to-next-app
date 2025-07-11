import { prisma } from '@/lib/prisma'

export const getTickets = async (userId: string | undefined) => {
  return await prisma.ticket.findMany({
    where: {
      userId,
    },
    orderBy: {
      updateAt: 'desc',
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  })
}
