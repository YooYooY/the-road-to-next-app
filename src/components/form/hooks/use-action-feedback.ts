import { useEffect, useRef } from 'react'
import { ActionState } from '../utils/to-action-state'

type OnArgs = {
  actionState: ActionState
}

type UseActionFeedbackOptions = {
  onSuccess?: (args: OnArgs) => void
  onError?: (args: OnArgs) => void
}

const useActionFeedback = (actionState: ActionState, options?: UseActionFeedbackOptions) => {
  const prevUpdate = useRef(actionState.timestamp);
  const isUpdate = actionState.timestamp !== prevUpdate.current;
  
  useEffect(() => {
    
    if(!isUpdate) return;
        
    if(actionState.status === 'SUCCESS' && options?.onSuccess) {
      options.onSuccess({ actionState })
    }
    
    if(actionState.status === 'ERROR' && options?.onError) {
      options.onError({ actionState })
    }
    
    prevUpdate.current = actionState.timestamp
  
    
  }, [isUpdate, actionState, options])
  
  
}

export { useActionFeedback }
