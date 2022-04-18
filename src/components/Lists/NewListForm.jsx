import React, { useState } from 'react'

export const NewListForm = ({ handleSubmit }) => {
  const [listName, setListName] = useState('')
  const onSubmit = e => {
    e.preventDefault()
    handleSubmit(listName)
    setListName('')
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="control-strip">
        <input
          className="control"
          name="listName"
          value={listName}
          onChange={e => setListName(e.target.value)}
        />
        <button className="control">Create</button>
      </div>
    </form>
  )
}
