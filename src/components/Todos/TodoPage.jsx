import React, { Component } from 'react';
import "../../styles/TodoPage.css"
import { Tag } from '../shared/Tag';
import { MoreMenu } from '../shared/MoreMenu'
import TodoForm from './TodoForm';

class TodoPage extends Component {
  editorKey = 0
  state = {
    editing: false,
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

  handleEditSave = ({ todoText, listId, completedAt }) => {
    const { todo, updateTodo } = this.props
    const todoUpdates = {}

    if (completedAt && completedAt.toISOString() !== new Date(todo.completed_at).toISOString()) {
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
    const { tag } = this.state;
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
        <TodoForm
          todo={todo}
          lists={this.props.lists}
          handleSubmit={this.handleEditSave}
          requestLists={this.props.requestLists}
        />
        {/* Todo: Implement a tag editor an integrate with TodoForm */}
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
