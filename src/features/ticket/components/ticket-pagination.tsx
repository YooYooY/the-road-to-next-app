'use client'
import { useQueryStates } from 'nuqs'
import { paginationOtions, paginationParser } from '../search-params'
import Pagination from '@/components/pagination'

type TicketPaginationProps = {
  paginatedTicketsMetadata: {
    count: number
    hasNextPage: boolean
  }
}

const TicketPagination = ({ paginatedTicketsMetadata }: TicketPaginationProps) => {
  const [pagination, setPagination] = useQueryStates(paginationParser, paginationOtions)

  return <Pagination pagination={pagination} onPagination={setPagination} paginatedTicketsMetadata={paginatedTicketsMetadata} />
}

export default TicketPagination
