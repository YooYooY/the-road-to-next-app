import { Button } from './ui/button'

type PageAndSize = {
  page: number
  size: number
}

type PaginationProps = {
  pagination: PageAndSize
  onPagination: (pageAndSize: PageAndSize) => void
  paginatedTicketsMetadata: {
    count: number
    hasNextPage: boolean
  }
}

const Pagination = ({ pagination, onPagination, paginatedTicketsMetadata: { count, hasNextPage } }: PaginationProps) => {
  const startOffset = pagination.page * pagination.size + 1
  const endOffset = startOffset + pagination.size - 1
  const actualEndOffset = Math.min(endOffset, count)

  // TODO:
  const label = `${startOffset}-${actualEndOffset} of ${count}`

  const handlePreviousPage = () => {
    onPagination({
      page: pagination.page - 1,
      size: pagination.size,
    })
  }

  const handleNextPage = () => {
    onPagination({
      page: pagination.page + 1,
      size: pagination.size,
    })
  }

  const previousButton = (
    <Button variant="outline" size="sm" disabled={pagination.page < 1} onClick={handlePreviousPage}>
      Previous
    </Button>
  )

  const nextButton = (
    <Button variant="outline" size="sm" disabled={!hasNextPage} onClick={handleNextPage}>
      Next
    </Button>
  )

  return (
    <div className="flex justify-between items-center">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex gap-x-2">
        {previousButton}
        {nextButton}
      </div>
    </div>
  )
}

export default Pagination
