import React, { useState, useEffect } from 'react'
import { Layout as AntdLayout } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { SiderMenu } from './siderMenu'
import { Calendar } from './calendar'
import './layout.less'
import moment from 'moment'

const { Footer } = AntdLayout
interface LayoutProps {
  Comp: React.FC
}

const Layout: React.FC<LayoutProps> = ({ Comp }) => {
  const { pickedDate } = useSelector((state) => state)
  const [value, setValue] = useState(
    pickedDate === moment().format('YYYY-MM-DD') ? moment() : moment(pickedDate)
  )
  useEffect(() => {
    setValue(moment(pickedDate, 'YYYY-MM-DD'))
  }, [pickedDate])

  const dispatch = useDispatch()
  const handleSelect = (date: any) => {
    console.log(typeof date)
    const pickedDate = moment(date._d).format('YYYY-MM-DD')
    dispatch({ type: 'SET_PICKEDDATE', pickedDate })
  }

  return (
    <div className="layout">
      <SiderMenu />
      <div className="calendar-cover">
        <Calendar
          defaultValue={moment()}
          value={value}
          imgUrl="https://images.pexels.com/photos/3049121/pexels-photo-3049121.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          onSelect={handleSelect}
        />
      </div>
      <div className="content">
        <Comp />
      </div>
      <Footer className="main-footer">Footer</Footer>
    </div>
  )
}

export { Layout }
