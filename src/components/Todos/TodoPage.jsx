import '../../styles/TodoPage.css'
import * as api from '../../api'
import { MoreMenu } from '../shared/MoreMenu'
import React, { Component } from 'react'
import Tags from '../shared/Tags'
import TodoForm from './TodoForm'

class TodoPage extends Component {
  editorKey = 0
  state = {
    editing: false,
    loading: true,
    todo: null,
    error: '',
    tag: ''
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

  handleRemoveTag = async tag => {
    const { todo } = this.state
    try {
      const { data } = await api.removeTagFromTodo(todo.id, tag)
      const { removedTag } = data.payload
      this.setState({
        todo: {
          ...todo,
          tags: todo.tags.filter(tag => tag !== removedTag.name)
        }
      })
    } catch (err) {
      window.alert(`There was a problem removing the tag =(`)
      console.error(err)
    }
  }

  handleAddTag = async () => {
    const { tag, todo } = this.state
    try {
      let { data } = await api.requestAddTag(todo.id, tag)
      this.setState({
        todo: { ...todo, tags: [...todo.tags, data.payload.addedTag.name] }
      })
    } catch (err) {
      window.alert(`There was a problem adding the tag =(`)
      console.error(err)
    }
  }

  handleTagInput = e => {
    this.setState({
      tag: e.target.value
    })
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
        <div className="todo-tags">
          <Tags
            tags={todo.tags}
            areTodoTags={true}
            handleRemoveTag={this.handleRemoveTag}
          />
          <div className="control-strip--horizontal">
            <input
              className="control"
              type="text"
              onChange={this.handleTagInput}
              value={tag}
            />
            <button className="control" onClick={this.handleAddTag}>
              Add Tag
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default TodoPage
