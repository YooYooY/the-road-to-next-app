import { getTickets } from '../queries/get-tickets'

import { TicketItem } from './ticket-item'
import { Placeholder } from '@/components/placeholder'
import { ParsedSearchParams } from '../search-params'
import TicketSortSelect from './ticket-sort-select'
import TicketSearchInput from './ticket-search-input'
import TicketPagination from './ticket-pagination'

type TicketListProps = {
  userId?: string
  searchParams: ParsedSearchParams
}

const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const { list: tickets, metadata: ticketMetadata } = await getTickets(userId, searchParams)

  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
      <div className="w-full max-w-[420px] flex gap-x-2">
        <TicketSearchInput placeholder="Search tickets..." />
        <TicketSortSelect
          options={[
            {
              sortKey: 'createAt',
              sortValue: 'desc',
              label: 'Newest',
            },
            {
              sortKey: 'bounty',
              sortValue: 'desc',
              label: 'Bounty',
            },
          ]}
        />
      </div>
      {tickets.length ? (
        tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)
      ) : (
        <Placeholder label="No tickets found" />
      )}

      <div className="w-full max-w-[420px]">
        <TicketPagination paginatedTicketsMetadata={ticketMetadata} />
      </div>
    </div>
  )
}

export { TicketList }
