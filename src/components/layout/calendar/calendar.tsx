import React from 'react'
import { Calendar as AntCalendar } from 'antd'
import './calendar.less'

interface CalendarProps {
  className?: string
  children?: React.ReactNode
}
// function onPanelChange(value, mode) {
//   console.log(value, mode)
// }
const Calendar: React.FC<CalendarProps> = ({ children, ...props }) => {
  return (
    <div className="calendar">
      <div className="cover">
        <img
          alt=""
          src="https://images.pexels.com/photos/3049121/pexels-photo-3049121.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        />
      </div>
      <div className="calendar-module">
        <AntCalendar
          fullscreen={false}
          onPanelChange={() => {
            console.log('click')
          }}
        />
      </div>
    </div>
  )
}

export { Calendar }
