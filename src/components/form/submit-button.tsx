'use client'

import clsx from 'clsx'
import { LucideLoader2 } from 'lucide-react'
import { cloneElement } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'

type SubmitButtonProps = {
  label?: string
  icon?: React.ReactElement
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const SubmitButton = ({ label, icon, variant = 'default', size = 'default' }: SubmitButtonProps) => {
  const { pending } = useFormStatus()

  const cloneIcon = icon ? (
    <span>{cloneElement(icon, { className: 'h-4 w-4' })}</span>
  ) : null

  return (
    <Button disabled={pending} type="submit" variant={variant} size={size}>
      {pending && <LucideLoader2 className={clsx('h-4 w-4 animate-spin')} />}
      {label}
      {pending && !label ? null : cloneIcon}
    </Button>
  )
}

export { SubmitButton }
