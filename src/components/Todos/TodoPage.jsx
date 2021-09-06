import React, { Component } from 'react';
import "../../styles/TodoPage.css"
import { Tag } from '../shared/Tag';
import { MoreMenu } from '../shared/MoreMenu'
import DatePicker from 'react-datepicker'
import TrixEditor from '../shared/TrixEditor'

class TodoPage extends Component {
  editorKey = 0
  state = {
    text: '',
    editing: false,
    tag: '',
    selectedDay: null,
    listId: '-1'
  }

  componentDidUpdate(prevProps) {
    const { todo } = this.props
    if (todo && todo !== prevProps.todo) {
      this.setState({
        text: todo.text,
        selectedDay: new Date(this.props.todo.completed_at),
        listId: todo.list_id ?? '-1'
      })
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.getTodo(id)
    const { lists } = this.props
    if (!lists.length) {
      this.props.requestLists()
    }
  }

  handleToggleCompleted = (e) => {
    this.props.toggleCompleted(this.props.todo.id)
  }

  handleEditSave = (e) => {
    e.preventDefault()
    const { todo, updateTodo } = this.props
    const { selectedDay, text, listId } = this.state
    const todoUpdates = {}

    if (selectedDay.toISOString() !== new Date(todo.completed_at).toISOString()) {
      todoUpdates.completed_at = selectedDay.toISOString()
    }

    if (todo.text !== text) {
      todoUpdates.text = text
    }

    if (listId !== '-1' && listId !== todo.list_id) {
      todoUpdates.list_id = listId
    }

    if (Object.values(todoUpdates).length) {
      updateTodo(todo.id, todoUpdates)
    }

    this.setEditing(false)
  }

  handleTodoText = (content) => {
    this.setState({
      text: content
    })
  }

  handleTagInput = (e) => {
    const { value } = e.target
    this.setState({
      tag: value.toLowerCase()
    })
  }

  handleListChange = (e) => {
    const { value } = e.target
    this.setState({
      listId: value
    })
  }

  handleDeleteTodo = (e) => {
    const todoId = this.props.todo.id
    const { deleteTodo, history } = this.props
    deleteTodo(todoId)
    history.goBack()
  }

  handleRemoveTag = (tag) => {
    const { removeTagFromTodo, todo } = this.props
    removeTagFromTodo(todo.id, tag)
  }

  handleAddTag = () => {
    const { tag } = this.state
    const { requestAddTag, todo } = this.props
    requestAddTag(todo.id, tag)
  }

  setEditing = (value) => {
    this.setState({ editing: value })
  }

  handleDateChange = (selectedDay) => {
    this.setState({
      selectedDay
    })
  }

  handleCancelClick = (e) => {
    e.preventDefault()
    this.setEditing(false)
  }

  render() {
    const { text, tag, editing, selectedDay, listId } = this.state;
    const { todo } = this.props;
    if (!todo) {
      return <p>Todo not found....</p>
    }

    return (
      <div className="todo-page">
        <MoreMenu
          handleEditClick={() => this.setEditing(true)}
          handleDeleteClick={this.handleDeleteTodo}
        />
        <input
          type="checkbox"
          readOnly
          checked={todo.completed}
          onChange={this.handleToggleCompleted}
        />
        <form
          data-todo_id={todo.id}
          onSubmit={this.handleEditSave}
        >
          {editing ?
            <>
              <TrixEditor
                value={text}
                onChange={this.handleTodoText}
                placeholder="What do you have to do?"
              />
              <div>
                <select value={listId} onChange={this.handleListChange}>
                  <option value="-1" disabled>Select a list for todo</option>
                  {
                    this.props.lists.map(list => (
                      <option key={list.id} value={list.id}>{list.name}</option>
                    ))
                  }</select>
                <button type="submit">Save</button>
                <button onClick={this.handleCancelClick}>Cancel</button>
              </div>
            </>
            :
            <div
              className={todo.completed ? "completed" : ""}
              dangerouslySetInnerHTML={{ __html: text }}
            ></div>
          } {todo.completed_at ?
            <div>
              <label>Completed at:</label>{" "}
              <style>{`
                /*
                Override due to default (85px) width cutting am/pm text
                https://github.com/Hacker0x01/react-datepicker/issues/2697
                */
                .react-datepicker__input-time-container 
                .react-datepicker-time__input-container 
                .react-datepicker-time__input 
                input {
                  width: unset
                }
                .react-datepicker__input-container > input {
                  border: ${!editing ? "0" : null}
                }
              `}</style>
              <DatePicker
                onChange={this.handleDateChange}
                selected={selectedDay}
                showTimeInput
                dateFormat="MM/dd/yyyy h:mm aa"
                shouldCloseOnSelect={false}
                readOnly={!editing}
              />
            </div> : null
          }
        </form>
        <div className="tags">
          <ul className="tags__list"> 🏷 {
            todo.tags.map(tag => <Tag key={tag} name={tag} handleRemoveTag={this.handleRemoveTag} />)
          }</ul>
          <input type="text" onChange={this.handleTagInput} value={tag} />
          <button onClick={this.handleAddTag}>Add Tag</button>
        </div>
      </div >
    )
  }
}

export default TodoPage;
