'use client'
import { useQueryStates } from 'nuqs'
import { paginationOtions, paginationParser } from '../search-params'
import Pagination from '@/components/pagination'

const TicketPagination = () => {
  const [pagination, setPagination] = useQueryStates(paginationParser, paginationOtions)

  return <Pagination pagination={pagination} onPagination={setPagination} />
}

export default TicketPagination
