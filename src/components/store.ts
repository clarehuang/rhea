import { localTimezone } from '../client/utils'
import moment from 'moment'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
        tasks: action.allTasks.sort(function (a, b) {
          return (
            parseInt(moment(localTimezone(a.range[0])).format('X')) -
            parseInt(moment(localTimezone(b.range[0])).format('X'))
          )
        }),
      }
    case 'TASK_ADD':
      return {
        ...state,
        tasks: [...state.tasks, action.task],
      }
    case 'TASK_DELETE':
      return { ...state }

    default:
      return state
  }
}

export default reducer
