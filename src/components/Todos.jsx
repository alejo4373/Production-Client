import React, { Component } from 'react'
import { sanitizeTags } from '../util'
import TodoForm from './Todos/TodoForm'
import TodosFilter from './Todos/TodosFilter'
import TodosList from './Todos/TodosList'

class Todos extends Component {
  componentDidMount() {
    const tagsQueryString = this.props.location.search
    let tags = new URLSearchParams(tagsQueryString).getAll('tags[]')
    if (tags.length) {
      this.props.getTodosByTags(tagsQueryString)
    } else {
      this.props.getAllTodos()
    }
    if (this.props.requestLists) this.props.requestLists()
  }

  /* Event Handlers */
  handleSubmit = ({ todoText, todoValue, tags, listId }) => {
    const todo = {
      text: todoText.trim(),
      value: todoValue,
      completed: false,
      tags: sanitizeTags(tags.split(',')),
      ...(listId !== '-1' && { list_id: listId })
    }

    if (todo.text && todo.value) {
      this.props.addTodo(todo)
    }
  }

  handleFilterChange = e => {
    this.props.setTodosFilter(e.target.value)
  }

  render() {
    const { todos, toggleCompleted, filterValue, isInList } = this.props
    return (
      <div className="todos-container">
        <h2>{this.props.title}</h2>
        <TodoForm
          lists={this.props.lists}
          isInList={isInList}
          handleSubmit={this.handleSubmit}
          cta="Add"
          resetOnSubmit
        />
        <hr />
        <TodosFilter
          handleFilterChange={this.handleFilterChange}
          filterValue={filterValue}
        />
        <TodosList
          title="Todos"
          todos={todos}
          handlers={{
            toggleCompleted
          }}
        />
      </div>
    )
  }
}
export default Todos
