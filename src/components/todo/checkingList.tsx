import React, { useState } from 'react'
import clsx from 'clsx'
import { Checkbox } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { CheckingListItem, CheckingListItemData } from '../type'

interface CheckingListItemChildProps {
  item: CheckingListItem
  key: number
}

interface CheckingListProps {
  children?: React.ReactNode
  data: CheckingListItemData
}

const CheckingListItemChild: React.FC<CheckingListItemChildProps> = ({ item, key }) => {
  const [checked, setChecked] = useState(item.checked)
  const handleChange = (e: CheckboxChangeEvent): void => {
    setChecked((old) => !old)
  }
  return (
    <Checkbox
      onChange={handleChange}
      key={key}
      defaultChecked={item.checked}
      checked={checked}
      className={clsx(`testing-${key}`, { 'line-through': checked })}
    >
      {item.content}
    </Checkbox>
  )
}

const CheckingList: React.FC<CheckingListProps> = ({ data }) => {
  return (
    <div className={clsx('checkinglist__container')}>
      <h1 className={clsx('checkinglist__header')}>CHEKCKING LIST</h1>
      <div className={clsx('checkinglist__list')}></div>
      {data.map((item, index: number) => {
        return <CheckingListItemChild item={item} key={index} />
      })}
    </div>
  )
}

export default CheckingList
