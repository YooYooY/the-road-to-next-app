'use client'
import { useActionState } from 'react'
import { FieldError } from '@/components/form/field-error'
import { Form } from '@/components/form/form'
import { SubmitButton } from '@/components/form/submit-button'
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state'
import { Input } from '@/components/ui/input'
import { signUp } from '../actions/sign-up'

const SignUpForm = () => {
  const [actionState, action] = useActionState(signUp, EMPTY_ACTION_STATE)

  return (
    <Form action={action} actionState={actionState}>
      <Input
        name="username"
        placeholder="Username"
        defaultValue={(actionState.payload?.formData.get('username') as string) || ''}
      />
      <FieldError actionState={actionState} name="username" />

      <Input name="email" placeholder="Email" defaultValue={(actionState.payload?.formData.get('email') as string) || ''} />
      <FieldError actionState={actionState} name="email" />

      <Input
        type="password"
        name="password"
        placeholder="Password"
        defaultValue={(actionState.payload?.formData.get('password') as string) || ''}
      />
      <FieldError actionState={actionState} name="password" />

      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        defaultValue={(actionState.payload?.formData.get('confirmPassword') as string) || ''}
      />
      <FieldError actionState={actionState} name="confirmPassword" />

      <SubmitButton label="Sign Up" />
    </Form>
  )
}

export default SignUpForm
