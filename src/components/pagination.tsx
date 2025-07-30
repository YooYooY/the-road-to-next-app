import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

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

  const handleChangeSize = (siez: string) => {
    onPagination({
      page: 0,
      size: parseInt(siez),
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
  
  const sizeButton = (
    <Select onValueChange={handleChangeSize} defaultValue={pagination.size.toString()}>
      <SelectTrigger className="h-[36px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="5">5</SelectItem>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="25">25</SelectItem>
        <SelectItem value="50">50</SelectItem>
        <SelectItem value="100">100</SelectItem>
      </SelectContent>
    </Select>
  )

  return (
    <div className="flex justify-between items-center">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex gap-x-2">
        {sizeButton}
        {previousButton}
        {nextButton}
      </div>
    </div>
  )
}

export default Pagination
