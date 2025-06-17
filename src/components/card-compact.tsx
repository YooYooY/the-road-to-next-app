import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'

type CardCompactProps = {
  title: string
  description: string
  className?: string
  content: React.ReactNode
  footer?: React.ReactNode
}

const CardCompact = ({ title, description, className, content, footer }: CardCompactProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  )
}

export { CardCompact }
