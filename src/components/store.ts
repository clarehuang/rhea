import { localTimezone } from '../client/utils'
import moment from 'moment'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function reducer(
  state = {
    tasks: [],
    blogs: [],
    activeForm: {},
  },
  action
) {
  switch (action.type) {
    case 'SET_ACTIVEFORM':
      return {
        ...state,
        activeForm: { id: action.id, formRef: action.ref },
      }
    case 'RESET_ACTIVEFORM':
      return {
        ...state,
        activeForm: {},
      }
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
        tasks: [...state.tasks, action.task].sort(function (a, b) {
          return (
            parseInt(moment(localTimezone(a.range[0])).format('X')) -
            parseInt(moment(localTimezone(b.range[0])).format('X'))
          )
        }),
      }
    case 'TASK_DELETE':
      return { ...state }
    case 'TASK_CHECK': {
      const checkedTaskIndex = state.tasks.findIndex(({ _id }) => _id === action.checkedID)
      state.tasks[checkedTaskIndex].status =
        state.tasks[checkedTaskIndex].status === 'default' ? 'check' : 'default'
      return {
        ...state,
        tasks: [...state.tasks],
      }
    }
    case 'TASK_EDIT': {
      const editedTaskIndex = state.tasks.findIndex(({ _id }) => _id === action.editedId)
      state.tasks[editedTaskIndex] = Object.assign(
        state.tasks[editedTaskIndex],
        action.updatedValues
      )
      return {
        ...state,
        tasks: [...state.tasks],
      }
    }
    default:
      return state
  }
}

export default reducer
