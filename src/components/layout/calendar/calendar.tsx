import React from 'react'
import { Calendar as AntCalendar, Row, Col } from 'antd'
import './calendar.less'
import clsx from 'clsx'
import { useI18n } from 'react-simple-i18n'
import { Moment } from 'moment'

interface CalendarProps {
  imgUrl: string
  onPanelChange?: (value: object, mode: string) => void
  onSelect?: (date: object) => void
  className?: string
  defaultValue?: Moment
  value?: Moment
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
  const today = new Date()
  const dd = String(today.getDate()).padStart(2, '0')
  const mm = today.getMonth()
  const day = today.getDay()
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const handlePanelChange = (value: object, mode: string): void => {
    onPanelChange?.(value, mode)
  }
  const handleSelecrt = (date: object): void => {
    onSelect?.(date)
  }

  return (
    <div className={clsx('calendar', className)} {...props}>
      <div className="calendar-today">
        <Row className="date">
          <h5 className="month">{months[mm]}</h5>
          <h1>{dd}</h1>
        </Row>
        <Row className="week">
          <h5>{weeks[day]}</h5>
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
