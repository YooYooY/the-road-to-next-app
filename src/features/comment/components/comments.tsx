import { CardCompact } from '@/components/card-compact'
import { getComments } from '../queries/get-comments'
import CommentCreateForm from './comment-create-form'
import CommentItem from './comment-item'

type CommentProps = {
  ticketId: string
}

const Comments = async ({ ticketId }: CommentProps) => {
  const comments = await getComments(ticketId)

  return (
    <>
      <CardCompact
        title="Create Comment"
        description="A new comment will be created"
        className='mr-8'
        content={<CommentCreateForm ticketId={ticketId} />}
      />
      <div className="flex flex-col gap-y-2 mr-8">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </>
  )
}

export default Comments
