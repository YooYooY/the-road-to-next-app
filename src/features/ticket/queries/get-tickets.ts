import { prisma } from '@/lib/prisma'
import { SearchParams } from '../search-params'

export const getTickets = async (userId: string | undefined, searchParams: SearchParams) => {
  return await prisma.ticket.findMany({
    where: {
      userId,
      title: {
        contains: searchParams.search
      },
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
