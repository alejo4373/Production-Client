import React, { useRef, useEffect, useState } from 'react'
import {
  ReactTrixRTEInput as TrixEditor,
  ReactTrixRTEToolbar as TrixToolbar
} from 'react-trix-rte'
import Trix from 'trix'
import './TrixEditor.css'

const Editor = ({ value, onChange, placeholder, id, isForTodo }) => {
  let options = ['heading1', 'bold', 'italic', 'link', 'bullet', 'number', 'undo', 'redo']
  let editorRef = useRef(null)
  const [editorKey, setEditorKey] = useState(0)

  const handleChange = (e, value) => {
    onChange(value)
  }

  useEffect(() => {
    const { editor } = editorRef.current
    if (value.length < 1 && editor.getDocument().toString().length > 1) {
      editor.loadJSON({ document: [] })
    }
  }, [value])

  useEffect(() => {
    const { editor } = editorRef.current
    let docFromValue = Trix.Document.fromHTML(value)

    /*
      Hack to trigger a new editor being mounted with the newest value.
      This is necessary because the content of the editor doesn't update
      when updating it. It only reads its value once, when mounting
      hence the defaultValue prop.

      This might not be necessary if I mount the editor on click of the text
      assuming I don't want the editor always visible but only when the user
      clicks the text of the todo, intending to change it.
    */
    if (editor && !editor.getDocument().isEqualTo(docFromValue)) {
      setEditorKey(editorKey + 1)
    }
  }, [value, editorKey])

  return (
    <div className="editor">
      <TrixToolbar
        toolbarId={`trix-toolbar${id ? '-' + id : ''}`}
        toolbarActions={options}
        disableGroupingAction={true}
      />
      <TrixEditor
        key={editorKey} // To make the editor re-render on new text through props
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
