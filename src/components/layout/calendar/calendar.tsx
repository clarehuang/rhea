import React from 'react'
import { Calendar as AntCalendar } from 'antd'
import './calendar.less'
import clsx from 'clsx'
import { useI18n } from 'react-simple-i18n'

interface CalendarProps {
  imgUrl: string
  onPanelChange?: (value: object, mode: string) => void
  onSelect?: (date: object) => void
  className?: string
}
const Calendar: React.FC<CalendarProps> = ({
  imgUrl,
  onPanelChange,
  onSelect,
  className,
  ...props
}) => {
  const { t } = useI18n()
  const handlePanelChange = (value: object, mode: string): void => {
    onPanelChange?.(value, mode)
  }
  const handleSelecrt = (date: object): void => {
    onSelect?.(date)
  }
  return (
    <div className={clsx('calendar', className)} {...props}>
      <div className="cover">
        <img alt={t('alt.coverImage')} src={imgUrl} />
      </div>
      <div className="calendar-module">
        <AntCalendar
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
