import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Calendar as AntCalendar, Row } from 'antd'
import './calendar.less'
import clsx from 'clsx'
import { useI18n } from 'react-simple-i18n'
import { TaskData } from '../type'
import { loadTasks } from '../../action/task'
import moment from 'moment'
import ajax from '../../client/utils/ajax'



interface CalendarProps {
  imgUrl: string
  onPanelChange?: (value: object, mode: string) => void
  onSelect?: (date: object) => void
  className?: string
  defaultValue?: moment.Moment
  value?: moment.Moment
}
const Calendar: React.FC<CalendarProps> = ({
  defaultValue,
  value,
  imgUrl,
  onPanelChange,
  onSelect,
  className,
  ...props
}) => {
  const { t } = useI18n()
  const dispatch = useDispatch()

  const today = moment().local()
  const dd = today.format('DD')
  const mm = today.format('MMM')
  const day = today.format('dddd')

  const handlePanelChange = (value: object, mode: string): void => {
    onPanelChange?.(value, mode)
  }
  const handleSelecrt = (date: object): void => {
    onSelect?.(date)
  }

  const handlePickDate = (e: React.MouseEvent | React.KeyboardEvent): void => {
    if (
      e.nativeEvent instanceof MouseEvent ||
      (e.nativeEvent instanceof KeyboardEvent && e.nativeEvent.keyCode === 32)
    ) {
      dispatch({ type: 'SET_PICKEDDATE', pickedDate: today.format('MM-DD-YYYY') })
    }
  }

  useEffect(()=>{
    ajax({
      url: '/api/task/calendar',
      method: 'GET',
      data: {},
      query: {},
      success(res, status) {
        const tasks = res as TaskData
        const markedDates = []
        tasks.forEach(item =>{
          markedDates.push(moment(item.range[0]).format('YYYY-MM-DD'))
        })
        console.log('getting res from calendar ', markedDates)
        // dispatch({ type: 'LOAD_TASK_SUCCESS', allTasks: tasks })
      },
      fail(res, status) {
        //TODO : finish fail action, indluding error handling
        // dispatch({ type: 'LOAD_TASK_FAIL' })
      },
    })
  })

  return (
    <div className={clsx('calendar', className)} {...props}>
      <div
        className="calendar-today"
        onClick={handlePickDate}
        onKeyDown={handlePickDate}
        role="button"
        tabIndex={0}
      >
        <Row className="date">
          <h5 className="month">{mm}</h5>
          <h1>{dd}</h1>
        </Row>
        <Row className="week">
          <h5>{day}</h5>
        </Row>
      </div>
      <div className="cover">
        <img alt={t('alt.coverImage')} src={imgUrl} />
      </div>
      <div className="calendar-module">
        <AntCalendar
          defaultValue={defaultValue}
          value={value}
          fullscreen={false}
          onPanelChange={handlePanelChange}
          onSelect={handleSelecrt}
        />
      </div>
    </div>
  )
}

export { Calendar }

// https://images.pexels.com/photos/2829026/pexels-photo-2829026.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260