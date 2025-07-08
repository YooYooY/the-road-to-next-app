import Link from 'next/link'
import { Placeholder } from '@/components/placeholder'
import { Button } from '@/components/ui/button'
import { ticketsPath } from '@/paths'

export default function NotFound() {
  return (
    <Placeholder
      label="We could not find this ticket"
      button={
        <Button>
          <Link href={ticketsPath()} replace>Go to Tickets</Link>
        </Button>
      }
    ></Placeholder>
  )
}
