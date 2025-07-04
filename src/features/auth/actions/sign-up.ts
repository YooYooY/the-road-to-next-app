'use server'

import { hash } from '@node-rs/argon2'
import { Prisma } from '@prisma/client'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import z from 'zod'
import { ActionState, fromErrorToActionState, toActionState } from '@/components/form/utils/to-action-state'
import { lucia } from '@/lib/lucia'
import { prisma } from '@/lib/prisma'
import { ticketsPath } from '@/paths'

const signupSchema = z
  .object({
    username: z
      .string()
      .min(1)
      .max(191)
      .refine((value) => !value.includes(' '), 'Username cannot contain spaces'),
    email: z.string().email().min(1, { message: 'Email is required' }).max(191),
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(6).max(191),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      })
    }
  })

export const signUp = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { username, email, password } = signupSchema.parse({
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    })

    const passwordHash = await hash(password)

    const data = {
      username,
      email,
      passwordHash,
    }
    
    const user = await prisma.user.create({
      data,
    })

    const session = await lucia.createSession(user.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)

    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return toActionState('ERROR', 'Either email or username is already in use', formData)
    }
    return fromErrorToActionState(error, formData)
  }

  redirect(ticketsPath())
}
