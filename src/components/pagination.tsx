import { Button } from './ui/button'

type PageAndSize = {
  page: number
  size: number
}

type Pagination = {
  pagination: PageAndSize
  onPagination: (pageAndSize: PageAndSize) => void
}

const Pagination = ({ pagination, onPagination }: Pagination) => {
  const startOffset = pagination.page * pagination.size + 1
  const endOffset = startOffset + pagination.size - 1

  // TODO:
  const label = `${startOffset}-${endOffset} of X`

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
    <Button variant="outline" size="sm" onClick={handleNextPage}>
      Next
    </Button>
  )

  return (
    <div className='flex justify-between items-center'>
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex gap-x-2">
        {previousButton}
        {nextButton}
      </div>
    </div>
  )
}

export default Pagination
