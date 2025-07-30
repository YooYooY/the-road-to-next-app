'use client'
import { CardCompact } from '@/components/card-compact'
import { CommentWithMetadata } from '../types'
import CommentCreateForm from './comment-create-form'
import CommentDeleteButton from './comment-delete-button'
import CommentItem from './comment-item'
import { Button } from '@/components/ui/button'
import { getComments } from '../queries/get-comments'
import { useEffect, useState } from 'react'

type CommentProps = {
  ticketId: string
  paginatedComments: {
    list: CommentWithMetadata[]
    metadata: {
      hasNextPage: boolean
      count: number
    }
  }
}

const Comments = ({ ticketId, paginatedComments }: CommentProps) => {

  const [comments, setComments] = useState(paginatedComments.list)
  const [moreButtonText, setMoreButtonTxt] = useState('More')
  const [hasMore, setHasMore] = useState(false)

  const handleMore = async () => {
    setMoreButtonTxt('Loading...')
    const { list: moreComments, metadata } = await getComments(ticketId, comments.length)
    setComments([...comments, ...moreComments])
    setMoreButtonTxt('More')

    setHasMore(comments.length < metadata.count)
  }

  useEffect(() => {
    setComments(paginatedComments.list)
    setHasMore(comments.length < paginatedComments.metadata.count)
  }, [paginatedComments.list])

  return (
    <>
      <CardCompact
        title="Create Comment"
        description="A new comment will be created"
        className="mr-8"
        content={<CommentCreateForm ticketId={ticketId} />}
      />
      <div className="flex flex-col gap-y-2 mr-8">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={[comment.isOwner && <CommentDeleteButton key={comment.id} id={comment.id} />]}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex flex-col justify-center mr-20">
          <Button variant="ghost" onClick={handleMore}>
            {moreButtonText}
          </Button>
        </div>
      )}
    </>
  )
}

export default Comments
