import React from 'react'
import { Link } from 'react-router-dom'
import { Layout } from 'antd'
import { useI18n } from 'react-simple-i18n'
import './sider.less'

const { Sider } = Layout

const SiderMenu: React.FC = () => {
  const { i18n, t } = useI18n()
  return (
    <Sider className="navbar-sider">
      <Link to="/">{t('nav.planner')}</Link>
      <Link to="/about">About</Link>
      <button onClick={() => i18n.setLang('en-US')}>English</button>
      <button
        onClick={() => {
          i18n.setLang('zh-TW')
        }}
      >
        中文
      </button>
    </Sider>
  )
}

export { SiderMenu }
