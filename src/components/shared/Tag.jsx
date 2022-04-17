import { Link } from 'react-router-dom'
import React from 'react'

const Tag = ({ name, handleRemoveTag, isTodoTag }) => {
  const handleClick = () => {
    handleRemoveTag(name)
  }

  // Todo: Once search thru browser query params is implemented remove `isTodoTag` prop
  let to = isTodoTag ? `/todos?tags[]=${name}` : '#'
  return (
    <li className="tag">
      <Link className="tag__label" to={to}>
        {name}
      </Link>
      <button className="tag__remove-btn" onClick={handleClick}>
        ×
      </button>
    </li>
  )
}

export default Tag
