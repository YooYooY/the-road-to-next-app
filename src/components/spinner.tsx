import { LucideLoader2 } from 'lucide-react'

export const Spinner = () => (
  <div role="status" className="flex-1 self-center flex flex-col items-center justify-center">
    <LucideLoader2 className="h-16 w-16 animate-spin"></LucideLoader2>
  </div>
)
