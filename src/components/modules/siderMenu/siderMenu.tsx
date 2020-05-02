import React from 'react'
import { NavLink } from 'react-router-dom'
import { useI18n } from 'react-simple-i18n'
import clsx from 'clsx'
import { Avatar } from 'antd'
import './siderMenu.less'

const SiderMenu: React.FC = () => {
  const { t } = useI18n()
  return (
    <div className="nav-sider">
      <Avatar
        size="large"
        alt={t('alt.profileImage')}
        src="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
      />
      <p className="xs-hidden sm-hidden md-hidden text-semi-bold">Venessa Mars</p>
      <NavLink to="/planner">{t('nav.planner')}</NavLink>
      <NavLink to="/journal">{t('nav.journal')}</NavLink>
      <NavLink to="/settings">{t('nav.settings')}</NavLink>
    </div>
  )
}

export { SiderMenu }
