'use client'
import { useQueryState, useQueryStates } from 'nuqs'
import { paginationOtions, paginationParser, searchParser } from '../search-params'
import Pagination from '@/components/pagination'
import { useEffect, useRef } from 'react'

type TicketPaginationProps = {
  paginatedTicketsMetadata: {
    count: number
    hasNextPage: boolean
  }
}

const TicketPagination = ({ paginatedTicketsMetadata }: TicketPaginationProps) => {
  const [pagination, setPagination] = useQueryStates(paginationParser, paginationOtions)
  const [search] = useQueryState('search', searchParser)
  const prevSearch = useRef(search)

  useEffect(() => {
    if (search === prevSearch.current) return
    prevSearch.current = search

    setPagination({
      ...pagination,
      page: 0,
    })
  }, [search, pagination, setPagination])

  return <Pagination pagination={pagination} onPagination={setPagination} paginatedTicketsMetadata={paginatedTicketsMetadata} />
}

export default TicketPagination
