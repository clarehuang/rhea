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
