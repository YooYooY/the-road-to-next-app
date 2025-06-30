import { useEffect, useRef } from 'react'
import { ActionState } from '../utils/to-action-state'

type OnArgs = {
  actionState: ActionState
  reset: ()=>void
}

type UseActionFeedbackOptions = {
  onSuccess?: (args: OnArgs) => void
  onError?: (args: OnArgs) => void
}

const useActionFeedback = (actionState: ActionState, options?: UseActionFeedbackOptions) => {
  
  const ref = useRef<HTMLFormElement>(null)
  
  const prevUpdate = useRef(actionState.timestamp);
  const isUpdate = actionState.timestamp !== prevUpdate.current;
  
  const handleReset = ()=>{
    ref.current?.reset()
  }
  
  useEffect(() => {
            
    if(!isUpdate) return;
        
    if(actionState.status === 'SUCCESS' && options?.onSuccess) {
      options.onSuccess({ actionState, reset: handleReset })
    }
    
    if(actionState.status === 'ERROR' && options?.onError) {
      options.onError({ actionState, reset: handleReset })
    }
    
    prevUpdate.current = actionState.timestamp
  
    
  }, [isUpdate, actionState, options])
  
  return {
    ref,
  }
  
}

export { useActionFeedback }
