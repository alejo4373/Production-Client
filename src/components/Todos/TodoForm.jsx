import React, { useEffect, useState } from 'react';
import TrixEditor from '../shared/TrixEditor';
import "../../styles/TodoForm.css"
import DatePicker from 'react-datepicker'

const TodoForm = ({
  todo,
  lists,
  handleSubmit,
  requestLists,
  cta = 'Save',
  resetOnSubmit
}) => {
  const [todoText, setTodoText] = useState('')
  const [todoValue, setTodoValue] = useState(100)
  const [tags, setTags] = useState('')
  const [listId, setListId] = useState('-1')
  const [completedAt, setCompletedAt] = useState(null)

  const onSubmit = (e) => {
    e.preventDefault()
    handleSubmit({
      todoText,
      todoValue,
      tags,
      listId,
      completedAt
    })

    if (resetOnSubmit) {
      setTodoText('')
      setTodoValue(100)
      setTags('')
      setListId('-1')
    }
  }

  useEffect(() => {
    if (!lists.length) {
      requestLists()
    }
  }, [requestLists, lists.length])

  useEffect(() => {
    if (todo) {
      if (todo.text) setTodoText(todo.text)
      if (todo.tags) setTags(todo.tags)
      if (todo.list_id) setListId(todo.list_id)
    }
  }, [todo])

  return (
    <form className="todo-form" onSubmit={onSubmit}>
      <TrixEditor
        placeholder='What do you want to do?'
        onChange={setTodoText}
        value={todoText}
      />
      <div className="control-strip">
        <select
          value={listId}
          onChange={(e) => setListId(e.target.value)}
          className="control-strip__control"
        >
          <option value="-1" disabled>Select a list for todo</option>
          {lists.map(list => (
            <option key={list.id} value={list.id}>{list.name}</option>
          ))}
        </select>
        <input
          className="control-strip__control"
          onChange={(e) => setTags(e.target.value)}
          value={tags}
          placeholder={'Tags: work, misc, etc.'}
          type="text"
        />
        {completedAt ? (
          <div>
            <label>Completed at:</label>{" "}
            <style>{`
                /*
                Override due to default (85px) width cutting am/pm text
                https://github.com/Hacker0x01/react-datepicker/issues/2697
                *
                .react-datepicker__input-time-container
                .react-datepicker-time__input-container
                .react-datepicker-time__input
                input {
                  width: unset
                }
              `}</style>
            <DatePicker
              onChange={(date) => setCompletedAt(date)}
              selected={completedAt}
              showTimeInput
              dateFormat="MM/dd/yyyy h:mm aa"
              shouldCloseOnSelect={false}
            />
          </div>) : null
        }
        <div className="control-strip__two-col-row">
          <input
            className="control-strip__control"
            onChange={(e) => setTodoValue(e.target.value)}
            value={todoValue}
            placeholder={'Value'}
            type="number"
            min="100"
            required
          />
          <button className="control-strip__control" >{cta}</button>
        </div>
      </div>
    </form>
  )
}

export default TodoForm;
