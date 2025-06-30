import { ZodError } from 'zod'

export type ActionState = {
  status: 'IDLE' | 'SUCCESS' | 'ERROR'
  message: string
  fieldErrors: Record<string, string[] | undefined>
  timestamp: number
  payload?: {
    formData: FormData
  }
}

export const EMPTY_ACTION_STATE: ActionState = {
  status: 'IDLE',
  message: '',
  fieldErrors: {},
  timestamp: Date.now(),
}

export const fromErrorToActionState = (error: unknown): ActionState => {
  // if validation error with Zod, return first error message
  if (error instanceof ZodError) {
    return {
      status: 'ERROR',
      fieldErrors: error.flatten().fieldErrors,
      timestamp: Date.now(),
      message: error.errors[0].message,
    }
  }

  // if another error, return Error message
  // e.g database error
  if (error instanceof Error) {
    return {
      status: 'ERROR',
      timestamp: Date.now(),
      fieldErrors: {},
      message: error.message,
    }
  }

  // if not an error instance but something else crashed
  // return generic error message
  return {
    status: 'ERROR',
    timestamp: Date.now(),
    fieldErrors: {},
    message: 'An unknown error occurred',
  }
}

export const toActionState = (status: ActionState['status'], message: string): ActionState => {
  return {
    ...EMPTY_ACTION_STATE,
    status,
    message,
    fieldErrors: {},
    timestamp: Date.now(),
  }
}
