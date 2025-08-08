'use client'
import { useActionState } from "react"
import { FieldError } from "@/components/form/field-error"
import { Form } from "@/components/form/form"
import { SubmitButton } from "@/components/form/submit-button"
import { ActionState, EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state"
import { Textarea } from "@/components/ui/textarea"
import { createComment } from "../actions/create-comment"
import { CommentWithMetadata } from "../types"

type CommentCreateFormProps = {
  ticketId: string;
  onCreateComment?: (comment: CommentWithMetadata | undefined) => void
}

const CommentCreateForm = ({ ticketId, onCreateComment }: CommentCreateFormProps) => {
  
  const [actionState, action] = useActionState(createComment.bind(null, ticketId), EMPTY_ACTION_STATE)
  
  const handleSuccess = (actionState: ActionState<CommentWithMetadata>) => {
    onCreateComment?.(actionState.data)
  }
  
  return (
    <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
      <Textarea
        name="content"
        placeholder="What's on your mind..."
        defaultValue={(actionState.payload?.formData.get('content') as string) || ''}
      />
      <FieldError name="content" actionState={actionState} />
      <SubmitButton label="Comment" />
    </Form>
  )
}

export default CommentCreateForm