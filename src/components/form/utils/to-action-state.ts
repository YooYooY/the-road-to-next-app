import { ZodError } from 'zod'

export type ActionState = {
  message: string
}

export const fromErrorToActionState = (error: unknown): ActionState => {
  // if validation error with Zod, return first error message
  if (error instanceof ZodError) {
    return {
      message: error.errors[0].message,
    }
  }
  
  // if another error, return Error message
  // e.g database error
  if (error instanceof Error) {
    return {
      message: error.message,
    }
  }

  // if not an error instance but something else crashed
  // return generic error message
  return {
    message: 'An unknown error occurred',
  }
}
