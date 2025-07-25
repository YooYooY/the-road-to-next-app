import { hash } from '@node-rs/argon2'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const users = [
  {
    username: 'user1',
    email: 'KzEoH@example.com',
  },
  {
    username: 'user2',
    email: 'q4YtM@example.com',
  },
]

const tickets = [
  {
    title: 'Ticket 1',
    content: 'First ticket from DB.',
    status: 'DONE' as const,
    deadline: new Date().toISOString().split('T')[0],
    bounty: 499,
  },
  {
    title: 'Ticket 2',
    content: 'Second ticket from DB.',
    status: 'OPEN' as const,
    deadline: new Date().toISOString().split('T')[0],
    bounty: 388,
  },
  {
    title: 'Ticket 3',
    content: 'Third ticket from DB.',
    status: 'IN_PROGRESS' as const,
    deadline: new Date().toISOString().split('T')[0],
    bounty: 200,
  },
]

const seed = async () => {
  try {
    const t0 = performance.now()
    console.log('DB Seed: Started ...')

    await prisma.user.deleteMany()
    await prisma.ticket.deleteMany()

    const dbUsers = await Promise.all(
      users.map(async (user) => {
        const passwordHash = await hash('password')
        return prisma.user.create({
          data: {
            ...user,
            passwordHash,
          },
        })
      })
    )

    await prisma.ticket.createMany({
      data: tickets.map((ticket) => ({
        ...ticket,
        userId: dbUsers[0].id,
      })),
    })

    const t1 = performance.now()
    console.log(`DB Seed: Finished (${t1 - t0}ms)`)
  } catch (error) {
    console.error(error)
  }
}

seed()
