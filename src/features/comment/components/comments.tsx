'use client'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react';
import { useInView } from "react-intersection-observer";
import { CardCompact } from '@/components/card-compact'
import { Skeleton } from '@/components/ui/skeleton';
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
  const queryKey = [ 'comments', ticketId ];
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => getComments(ticketId, pageParam),
    initialPageParam: undefined as string | undefined,
    initialData: {
      pages: [
        {
          list: paginatedComments.list,
          metadata: paginatedComments.metadata,
        },
      ],
      pageParams: []
    },
    getNextPageParam: (lastPage) => (lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined),
  })

  // const handleMore = async () => {
  //   const { list: moreComments, metadata: newMetadata } = await getComments(ticketId, metadata.cursor)
  //   setComments([...comments, ...moreComments])
  //   setMetadata(newMetadata)
  // }
  const comments = data?.pages.flatMap((page) => page.list) || []
  const handleMore = () => fetchNextPage()

  // const onDeleteComment = (id: string) => {
  //   setComments((prevComments) => prevComments.filter((comment) => comment.id !== id))
  // }

  // const handleCreateComment = (comment: CommentWithMetadata | undefined) => {
  //   if (!comment) return
  //   setComments((prevComments) => [comment, ...prevComments])
  // }

  const queryClient = useQueryClient()

  const onDeleteComment = (id: string) => {
    queryClient.invalidateQueries({ queryKey })
  }
  const handleCreateComment = (comment: CommentWithMetadata | undefined) => {
    queryClient.invalidateQueries({ queryKey })
    // refetch()
  }


  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [ inView, fetchNextPage, hasNextPage, isFetchingNextPage ])


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

      {
        isFetchingNextPage && (
          <>
            <div className='flex gap-x-2'>
              <Skeleton className='h-[82px] w-full' />
              <Skeleton className='h-[40px] w-[40px]' />
            </div>
            <div className='flex gap-x-2'>
              <Skeleton className='h-[82px] w-full' />
              <Skeleton className='h-[40px] w-[40px]' />
            </div>
          </>
        )
      }

      <div ref={ref}>
        {
          !hasNextPage && (
            <p className='text-right text-xs italic text-foreground'>No more comments.</p>
          )
        }
      </div>

    </>
  )
}

export default Comments
