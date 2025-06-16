import { LucideMessageSquareWarning } from 'lucide-react'
import { cloneElement } from 'react'

type PlaceholderProps = {
  label: string
  icon?: React.ReactElement
  button?: React.ReactNode
}

const Placeholder = ({ label, icon = <LucideMessageSquareWarning />, button = null }: PlaceholderProps) => {
  return (
    <div className="flex-1 self-center flex flex-col items-center justify-center gap-y-2">
      {cloneElement(icon, { className: 'h-16 w-16' })}
      <h2 className="text-lg text-center">{label}</h2>
      {button && button}
    </div>
  )
}

export { Placeholder }
