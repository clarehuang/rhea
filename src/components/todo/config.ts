export const taskFormConfig = {
  title: {
    rules: [{ required: true, message: 'Please enter the title of the task.' }],
  },
  location: {
    rules: [{ required: false }],
  },
  range: {
    rules: [{ required: true, message: 'Please enter the date and time.' }],
  },
  tag: {
    rules: [{ required: false }],
  },
  des: {
    rules: [{ required: false }],
  },
  status: {
    rules: [{ required: false }],
  },
}
