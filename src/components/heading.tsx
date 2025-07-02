import { getAuth } from '@/features/auth/queries/get-auth'
import { Separator } from './ui/separator'

type HeadingProps = {
  title: string
  description?: string
}

const Heading = async ({ title, description }: HeadingProps) => {
  const result = await getAuth()
  console.log('auth', result)
  
  return (
    <>
      <div className="px-8">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>

      <Separator />
    </>
  )
}

export { Heading }
