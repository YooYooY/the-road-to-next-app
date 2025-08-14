'use client'
import { useInfiniteQuery } from '@tanstack/react-query'
import { CardCompact } from '@/components/card-compact'
import { Button } from '@/components/ui/button'
import { PaginateData } from '@/types/pagination'
import { getComments } from '../queries/get-comments'
import { CommentWithMetadata } from '../types'
import CommentCreateForm from './comment-create-form'
import CommentDeleteButton from './comment-delete-button'
import CommentItem from './comment-item'

type CommentProps = {
  ticketId: string
  paginatedComments: PaginateData<CommentWithMetadata>
}

const Comments = ({ ticketId, paginatedComments }: CommentProps) => {
  // const [comments, setComments] = useState(paginatedComments.list)
  // const [metadata, setMetadata] = useState(paginatedComments.metadata)

  const {data, fetchNextPage, hasNextPage, isFetchingNextPage }=useInfiniteQuery({
    queryKey: ['comments', ticketId],
    queryFn: ({ pageParam }) => getComments(ticketId, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => (lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined),
  })

  // const handleMore = async () => {
  //   const { list: moreComments, metadata: newMetadata } = await getComments(ticketId, metadata.cursor)
  //   setComments([...comments, ...moreComments])
  //   setMetadata(newMetadata)
  // }
  const comments = data?.pages.flatMap((page) => page.list) || []
  const handleMore = ()=>fetchNextPage()

  // const onDeleteComment = (id: string) => {
  //   setComments((prevComments) => prevComments.filter((comment) => comment.id !== id))
  // }

  // const handleCreateComment = (comment: CommentWithMetadata | undefined) => {
  //   if (!comment) return
  //   setComments((prevComments) => [comment, ...prevComments])
  // }

   const onDeleteComment = (id: string) => {
    // TODO
   }
   const handleCreateComment = (comment: CommentWithMetadata | undefined) => {
     // TODO
   }


  return (
    <>
      <CardCompact
        title="Create Comment"
        description="A new comment will be created"
        className="mr-8"
        content={<CommentCreateForm ticketId={ticketId} onCreateComment={handleCreateComment} />}
      />
      <div className="flex flex-col gap-y-2 mr-8">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={[
              comment.isOwner && <CommentDeleteButton key={comment.id} id={comment.id} onDeleteComment={onDeleteComment} />,
            ]}
          />
        ))}
      </div>

      {hasNextPage && (
        <div className="flex flex-col justify-center mr-20">
          <Button variant="ghost" onClick={handleMore}>
            More
          </Button>
        </div>
      )}
    </>
  )
}

export default Comments
