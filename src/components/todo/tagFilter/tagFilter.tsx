import React, { useEffect } from 'react'
import clsx from 'clsx'
import { TagData } from '../../type'

interface TagFilterProps {
  tagData: TagData
  selectedTag?: string
  onSelectTag?: (tag: string) => void
  selectedTagColor?: string
  children?: React.ReactNode
}

const TagFilter: React.FC<TagFilterProps> = ({ tagData, selectedTag, ...props }) => {
  const handleClick = (e: React.MouseEvent | React.KeyboardEvent): void => {
    const elem = e.currentTarget as HTMLButtonElement
    if (
      e.nativeEvent instanceof MouseEvent ||
      (e.nativeEvent instanceof KeyboardEvent && e.nativeEvent.keyCode === 32)
    ) {
      props.onSelectTag?.(elem.value)
    }
  }
  // items: key of Tags
  const RenderTags = (items: Array<string>): React.ReactNode => {
    return items.map((item, index) => (
      <button
        className={clsx('tag', { selected: item === selectedTag })}
        key={`tag-${index}`}
        value={item}
        onClick={handleClick}
        onKeyDown={handleClick}
      >
        <span className="label-color" style={{ background: tagData[item][1] }}></span>
        {tagData[item][0]}
      </button>
    ))
  }
  const actualProps = { ...props }
  delete actualProps.onSelectTag

  useEffect(() => {
    // const elem = document.querySelector(`button[value = ${initialTag}]`) as HTMLButtonElement
    // elem.focus()
  }, [selectedTag])
  return <div className="task-tag-filter">{RenderTags(Object.keys(tagData))}</div>
}

export default TagFilter
