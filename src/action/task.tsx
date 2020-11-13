import { Task } from 'components/type'

export const loadTasks = (pickedDate) => {
  return (dispatch, getState, { ajax }) => {
    dispatch({ type: 'LOAD_TASK_START' })
    ajax({
      url: '/api/task',
      method: 'GET',
      data: {},
      query: { pickedDate },
      success(res, status) {
        const tasks = res
        dispatch({ type: 'LOAD_TASK_SUCCESS', allTasks: tasks })

        // TODO: add new tag color
        // for (let i = 0; i < Object.keys(Tags).length; i++) {
        //   const key = Object.keys(Tags)[i]
        //   const list = document.querySelectorAll(
        //     `.task-${key} .ant-timeline-item-head.ant-timeline-item-head-blue`
        //   )
        //   list.forEach((item) => (item.style.backgroundColor = Tags[key][1]))
        // }
      },
      fail(res, status) {
        //TODO : finish fail action, indluding error handling
        dispatch({ type: 'LOAD_TASK_FAIL' })
      },
    })
  }
}

export const addTasks = (values, startDate) => {
  return (dispatch, getState, { ajax }) => {
    dispatch({ type: 'ADD_TASK_START' })
    ajax({
      url: '/api/task',
      method: 'POST',
      data: { ...values, startDate },
      success(res, status) {
        //TODO : finish success action, indluding redirect to home page
        const obj = res as Task
        dispatch({
          type: 'ADD_TASK_SUCCESS',
          task: { ...values, _id: obj._id, __v: obj.__v },
        })
      },
      fail(res, status) {
        //TODO : finish fail action, indluding error handling
        dispatch({ type: 'ADD_TASK_FAIL' })
      },
    })
  }
}

export const deleteTasks = (itemId) => {
  return (dispatch, getState, { ajax }) => {
    dispatch({ type: 'DELETE_TASK_START' })
    ajax({
      url: '/api/task',
      method: 'DELETE',
      data: { _id: itemId },
      success(res, status) {
        dispatch({ type: 'DELETE_TASK_SUCCESS' })
      },
      fail(res, status) {
        //TODO : finish fail action, indluding error handling
        console.log(res)
        dispatch({ type: 'DELETE_TASK_FAIL' })
      },
    })
  }
}

export const editTasks = (itemId, values, startDate) => {
  return (dispatch, getState, { ajax }) => {
    dispatch({ type: 'EDIT_TASK_START' })
    ajax({
      url: '/api/task',
      method: 'PATCH',
      data: { _id: itemId, ...values, startDate },
      success(res, status) {
        dispatch({ type: 'EDIT_TASK_SUCCESS', editedId: itemId, updatedValues: values })
      },
      fail(res, status) {
        //TODO : finish fail action, indluding error handling
        dispatch({ type: 'EDIT_TASK_FAIL' })
      },
    })
  }
}

export const checkTasks = (itemId, currentStatus) => {
  return (dispatch, getState, { ajax }) => {
    dispatch({ type: 'CHECK_TASK_START' })
    ajax({
      url: '/api/task',
      method: 'PATCH',
      data: { _id: itemId, status: `${currentStatus === 'check' ? 'default' : 'check'}` },
      success(res, status) {
        dispatch({ type: 'CHECK_TASK_SUCCESS', checkedID: itemId })
      },
      fail(res, status) {
        //TODO : finish fail action, indluding error handling
        dispatch({ type: 'CHECK_TASK_FAIL' })
      },
    })
  }
}
