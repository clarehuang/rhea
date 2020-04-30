import React from 'react'

interface AvatorProps {
  children?: React.ReactNode
}

const Avator: React.FC<AvatorProps> = ({ ...props }) => {
  return (
    <div>
      <img alt="avator" src="" />
    </div>
  )
}
