import { TaskData } from './type'

function reducer(
  state = {
    tasks: [],
  },
  action
) {
  switch (action.type) {
    case 'TASK_GET':
      return {
        ...state,
        tasks: [action.tasks],
      }
    case 'TASK_ADD':
      return {
        ...state,
        tasks: [...state.tasks, action.tasks].sort(),
      }
    case 'TASK_DELETE':
      return { ...state }
  }
}

export default reducer
