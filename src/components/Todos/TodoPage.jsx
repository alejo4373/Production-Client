import '../../styles/TodoPage.css'
import * as api from '../../api'
import { MoreMenu } from '../shared/MoreMenu'
import { Tag } from '../shared/Tag'
import React, { Component } from 'react'
import TodoForm from './TodoForm'

class TodoPage extends Component {
  editorKey = 0
  state = {
    editing: false,
    loading: true,
    todo: null
  }

  /* Todo: Have this component manage it's own state and not need props*/
  async componentDidMount() {
    const { id } = this.props.match.params
    const { lists } = this.props
    try {
      const { data } = await api.fetchTodo(id)
      const todo = data.payload.todo
      this.setState({ todo })
      if (!lists.length) this.props.requestLists()
    } catch (err) {
      console.error(err)
    } finally {
      this.setState({ loading: false })
    }
  }

  handleToggleCompleted = () => {
    this.props.toggleCompleted(this.props.todo.id)
  }

  handleEditSave = ({ todoText, listId, completedAt }) => {
    const { todo } = this.state
    const { updateTodo } = this.props
    const todoUpdates = {}

    if (
      completedAt &&
      completedAt.toISOString() !== new Date(todo.completed_at).toISOString()
    ) {
      todoUpdates.completed_at = completedAt.toISOString()
    }

    if (todo.text !== todoText) {
      todoUpdates.text = todoText
    }

    if (listId !== '-1' && listId !== todo.list_id) {
      todoUpdates.list_id = listId
    }

    if (Object.values(todoUpdates).length) {
      updateTodo(todo.id, todoUpdates)
    }

    this.setEditing(false)
  }

  handleDeleteTodo = () => {
    const todoId = this.state.todo.id
    const { deleteTodo, history } = this.props
    deleteTodo(todoId)
    history.goBack()
  }

  handleRemoveTag = tag => {
    const { removeTagFromTodo } = this.props
    const { todo } = this.state
    removeTagFromTodo(todo.id, tag)
  }

  handleAddTag = () => {
    const { tag } = this.state
    const { requestAddTag, todo } = this.props
    requestAddTag(todo.id, tag)
  }

  setEditing = value => {
    this.setState({ editing: value })
  }

  handleDateChange = selectedDay => {
    this.setState({
      selectedDay
    })
  }

  handleCancelClick = e => {
    e.preventDefault()
    this.setEditing(false)
  }

  render() {
    const { tag, todo, loading } = this.state
    if (loading) return <p>Loading...</p>
    if (!todo) return <p>Todo not found....</p>
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
        <TodoForm
          todo={todo}
          lists={this.props.lists}
          handleSubmit={this.handleEditSave}
          requestLists={this.props.requestLists}
        />
        {/* Todo: Implement a tag editor an integrate with TodoForm */}
        <div className="tags">
          <ul className="tags__list">
            {' '}
            🏷{' '}
            {todo.tags.map(tag => (
              <Tag key={tag} name={tag} handleRemoveTag={this.handleRemoveTag} />
            ))}
          </ul>
          <input type="text" onChange={this.handleTagInput} value={tag} />
          <button onClick={this.handleAddTag}>Add Tag</button>
        </div>
      </div>
    )
  }
}

export default TodoPage
