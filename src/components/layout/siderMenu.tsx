import React from 'react'
import { NavLink } from 'react-router-dom'
import { useI18n } from 'react-simple-i18n'
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
      <small className="xs-hidden sm-hidden md-hidden text-bold">Venessa Mars</small>
      <NavLink to="/stories">{t('nav.stories')}</NavLink>
      <NavLink to="/todo">{t('nav.todo')}</NavLink>
      <NavLink to="/profile">{t('nav.profile')}</NavLink>
    </div>
  )
}

export { SiderMenu }
