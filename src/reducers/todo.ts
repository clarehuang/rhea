import { localTimezone } from '../client/utils/utils'
import moment from 'moment'

function reducer(
  state = {
    pickedDate: moment().local().format('YYYY-MM-DD'),
    tasks: [],
    stories: [],
    activeForm: {},
    activeStatus: { value: '', _id: '' },
  },
  action
) {
  switch (action.type) {
    case 'SET_PICKEDDATE':
      return {
        ...state,
        pickedDate: action.pickedDate,
      }
    case 'SET_ACTIVEFORM':
      return {
        ...state,
        activeForm: { id: action.id, formRef: action.ref },
      }
    case 'SET_ACTIVESTATUS':
      return {
        ...state,
        activeStatus: { value: action.statusValue, _id: action._id },
      }
    case 'LOAD_TASK_START':
      return {
        ...state,
        tasks: [...state.tasks],
        isLoadingTasks: true,
      }
    case 'LOAD_TASK_SUCCESS':
      return {
        ...state,
        isLoadingTasks: false,
        tasks: action.allTasks.sort((a, b) => {
          return (
            parseInt(moment(localTimezone(a.range[0])).format('X')) -
            parseInt(moment(localTimezone(b.range[0])).format('X'))
          )
        }),
      }
    case 'LOAD_TASK_FAIL':
      return {
        ...state,
        tasks: [],
        isLoadingTasks: false,
      }
    case 'ADD_TASK_START':
      return {
        ...state,
      }
    case 'ADD_TASK_SUCCESS':
      return {
        ...state,
        tasks: [...state.tasks, action.task].sort((a, b) => {
          return (
            parseInt(moment(localTimezone(a.range[0])).format('X')) -
            parseInt(moment(localTimezone(b.range[0])).format('X'))
          )
        }),
      }
    case 'ADD_TASK_FAIL':
      return {
        ...state,
      }
    case 'DELETE_TASK_START':
      return {
        ...state,
      }
    case 'DELETE_TASK_SUCCESS':
      return {
        ...state,
      }
    case 'DELETE_TASK_FAIL':
      return {
        ...state,
      }
    case 'CHECK_TASK_START':
      return {
        ...state,
      }
    case 'CHECK_TASK_SUCCESS': {
      const checkedTaskIndex = state.tasks.findIndex(({ _id }) => _id === action.checkedID)
      state.tasks[checkedTaskIndex].status =
        state.tasks[checkedTaskIndex].status === 'default' ? 'check' : 'default'
      return {
        ...state,
        tasks: [...state.tasks],
      }
    }
    case 'CHECK_TASK_FAIL':
      return {
        ...state,
      }
    case 'EDIT_TASK_START':
      return {
        ...state,
      }
    case 'EDIT_TASK_SUCCESS': {
      const editedTaskIndex = state.tasks.findIndex(({ _id }) => _id === action.editedId)
      state.tasks[editedTaskIndex] = Object.assign(
        state.tasks[editedTaskIndex],
        action.updatedValues
      )
      state.tasks.sort((a, b) => {
        return (
          parseInt(moment(localTimezone(a.range[0])).format('X')) -
          parseInt(moment(localTimezone(b.range[0])).format('X'))
        )
      })
      return {
        ...state,
        tasks: [...state.tasks],
      }
    }
    case 'EDIT_TASK_FAIL':
      return {
        ...state,
      }
    default:
      return state
  }
}

export default reducer
