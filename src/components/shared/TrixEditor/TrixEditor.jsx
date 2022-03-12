import React, { useRef, useEffect } from 'react'
import {
  ReactTrixRTEInput as TrixEditor,
  ReactTrixRTEToolbar as TrixToolbar
} from 'react-trix-rte'
import 'trix'
import TrixEditorSkeleton from './subcomponents/TrixEditorSkeleton'
import './TrixEditor.css'

const Editor = ({ value, onChange, placeholder, id, isForTodo, loading }) => {
  let options = ['heading1', 'bold', 'italic', 'link', 'bullet', 'number', 'undo', 'redo']
  let editorRef = useRef(null)

  const handleChange = (e, value) => {
    onChange(value)
  }

  /* If value was updated to empty string (e.g on submit) reset the content of trix-editor */
  useEffect(() => {
    if (!editorRef.current) return
    const { editor } = editorRef.current
    if (value.length < 1 && editor.getDocument().toString().length > 1) {
      editor.loadJSON({ document: [] })
    }
  }, [value])

  if (loading) return <TrixEditorSkeleton inline={isForTodo} />
  return (
    <div className="editor">
      <TrixToolbar
        toolbarId={`trix-toolbar${id ? '-' + id : ''}`}
        toolbarActions={options}
        disableGroupingAction={true}
      />
      <TrixEditor
        defaultValue={value}
        placeholder={placeholder}
        onChange={handleChange}
        trixInputRef={editorRef}
        toolbarId={`trix-toolbar${id ? '-' + id : ''}`}
        className={isForTodo ? 'trix-editor-small' : null}
      />
    </div>
  )
}
export default Editor
