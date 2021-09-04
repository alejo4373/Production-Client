import React from 'react';
import TrixEditor from '../shared/TrixEditor';
import "../../styles/TodoForm.css"

const TodoForm = (props) => {
  const { handleChange, handleSubmit, inputText, todoValue, tags, lists, listId } = props

  const handleTodoTextChange = (content) => {
    handleChange({ target: { name: 'inputText', value: content } })
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <TrixEditor
        onChange={handleTodoTextChange}
        value={inputText}
        placeholder={'What do you have to do?'}
      />
      <div className="control-strip">
        <select
          value={listId}
          onChange={handleChange}
          name="listId"
          className="control-strip__control"
        >
          <option value="-1" disabled>Select a list for todo</option>
          {lists.map(list => (
            <option key={list.id} value={list.id}>{list.name}</option>
          ))}
        </select>
        <input
          name='tags'
          className="control-strip__control"
          onChange={handleChange}
          value={tags}
          placeholder={'Tags: work, misc, etc.'}
          type="text"
        />
        <div className="control-strip__two-col-row">
          <input
            name='todoValue'
            className="control-strip__control"
            onChange={handleChange}
            value={todoValue}
            placeholder={'value'}
            type="number"
            min="100"
            required
          />
          <button className="control-strip__control" >Add</button>
        </div>
      </div>

    </form>
  )
}

export default TodoForm;
