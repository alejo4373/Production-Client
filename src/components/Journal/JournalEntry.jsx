import './JournalEntry.css'
import { MoreMenu } from '../shared/MoreMenu'
import { get24HourTimeString } from '../../util'
import React, { useState } from 'react'
import Tags from '../shared/Tags'
import TrixEditor from '../shared/TrixEditor/TrixEditor'

const JournalEntry = ({ entry, updateJournalEntry, showFullDate }) => {
  const date = new Date(entry.ts)
  const time = get24HourTimeString(date)
  const [text, setText] = useState(entry.text)
  const [editing, setEditing] = useState(false)

  const handleEditing = () => {
    setEditing(true)
  }

  const handleTextChange = content => {
    setText(content)
  }

  const handleSaveEdits = e => {
    setEditing(false)
    const updates = { text }
    updateJournalEntry(entry.id, updates)
  }

  const handleCancelEdits = () => {
    setEditing(false)
    setText(entry.text)
  }

  const handleDelete = () => {
    window.alert('JournalEntry will be deleted')
  }

  return (
    <li className="entry">
      <span className="entry__date">{showFullDate ? date.toLocaleString() : time}</span>
      <Tags
        tags={entry.tags}
        // Todo: Implement removal of tags for Journal entries
        handleRemoveTag={() => console.warn('Remove tag not implemented')}
      />
      {editing ? (
        <div>
          <TrixEditor value={text} id={entry.id} onChange={handleTextChange} />
          <button onClick={handleSaveEdits}>Save</button>
          <button onClick={handleCancelEdits}>Cancel</button>
        </div>
      ) : (
        <div>
          <div className="entry__text" dangerouslySetInnerHTML={{ __html: text }}></div>
          <MoreMenu handleEditClick={handleEditing} handleDeleteClick={handleDelete} />
        </div>
      )}
    </li>
  )
}

export default JournalEntry
