import React from 'react'
import { Layout as AntdLayout } from 'antd'
import { SiderMenu } from './siderMenu/siderMenu'
import { Calendar } from './calendar/calendar'
import './layout.less'

const { Footer } = AntdLayout
interface LayoutProps {
  Comp: React.FC
}

const Layout: React.FC<LayoutProps> = ({ Comp }) => {
  const handleSelect = (date: any) => {
    const pickedDate = date._d
    console.log(pickedDate.getMonth() + 1)
  }
  return (
    <div className="layout">
      <SiderMenu />
      <div className="calendar-cover">
        <Calendar
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
