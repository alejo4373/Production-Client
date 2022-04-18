import React from 'react'
import TagsInput from '../shared/TagsInput/TagsInput'
import TrixEditor from '../shared/TrixEditor/TrixEditor'

const JournalEntryEditor = props => {
  const { handleEntryText, handleTagsChange, handleSubmit, entryText, entryTags } = props

  return (
    <form onSubmit={handleSubmit} className="control-strip">
      <TrixEditor
        onChange={handleEntryText}
        value={entryText}
        placeholder={"What's in your head?"}
      />
      <div className="control-strip__two-col-row">
        <TagsInput onChange={value => handleTagsChange(value)} value={entryTags} />
        <button className="control">Add</button>
      </div>
    </form>
  )
}

export default JournalEntryEditor
