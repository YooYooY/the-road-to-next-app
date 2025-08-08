'use client'
import { LucideLoader2, LucideTrash } from 'lucide-react'
import { useConfirmDialog } from '@/components/confirm-dialog'
import { Button } from '@/components/ui/button'
import { deleteComment } from '../actions/delete-comment'

type CommentDeleteButtonProps = {
  id: string
  onDeleteComment?: (id: string) => void
}

const CommentDeleteButton = ({ id, onDeleteComment }: CommentDeleteButtonProps) => {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteComment.bind(null, id),
    trigger: (isPending) =>
      isPending ? (
        <Button disabled variant="outline" size="icon">
          <LucideLoader2 className="h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button variant="outline" size="icon">
          <LucideTrash className="h-4 w-4" />
        </Button>
      ),
    onSuccess: () => onDeleteComment?.(id),
  })

  return (
    <>
      {deleteButton}
      {deleteDialog}
    </>
  )
}

export default CommentDeleteButton
