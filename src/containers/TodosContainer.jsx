import '../styles/Todos.css'
import { Link, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import TagsList from '../components/Tags/TagsList'
import TodoPage from '../components/Todos/TodoPage'
import Todos from '../components/Todos'

import {
  REQUEST_ADD_TAG,
  REQUEST_ADD_TODO,
  REQUEST_DELETE_TODO,
  REQUEST_FETCH_TODO,
  REQUEST_FETCH_TODOS,
  REQUEST_FETCH_TODOS_BY_TAGS,
  REQUEST_REMOVE_TAG,
  REQUEST_TOGGLE_TODO_COMPLETED,
  REQUEST_UPDATE_TODO,
  SET_TODOS_FILTER
} from '../store/actionTypes/todos'
import { REQUEST_LISTS } from '../store/actionTypes/lists'
import { applyTodosFilter } from '../util/todos'

class TodosContainer extends Component {
  /* Todo's Ops */
  deleteTodo = todoId => {
    this.props.deleteTodo(todoId)
  }

  getAllTodos = () => {
    this.props.fetchTodos()
  }

  getTodo = id => {
    this.props.fetchTodo(id)
  }

  filterTodos = id => {
    this.props.setTodosFilter(id)
  }

  toggleCompleted = id => {
    this.props.toggleTodoCompleted(id)
  }

  updateTodo = (todoId, updates) => {
    this.props.updateTodo(todoId, updates)
  }

  removeTagFromTodo = (id, tag) => {
    this.props.removeTagFromTodo(id, tag)
  }

  requestAddTag = (id, tag) => {
    this.props.requestAddTag(id, tag)
  }

  getTodosByTags = async tagsQueryString => {
    this.props.fetchTodosByTags(tagsQueryString)
  }

  renderTodos = routeProps => {
    const { todos, filter } = this.props.todos
    const { lists } = this.props
    let filteredTodos = applyTodosFilter(todos, filter)
    return (
      <Todos
        title="All Todos"
        todos={filteredTodos}
        lists={lists}
        deleteTodo={this.deleteTodo}
        toggleCompleted={this.toggleCompleted}
        getAllTodos={this.getAllTodos}
        getTodosByTags={this.getTodosByTags}
        addTodo={this.props.addTodo}
        setTodosFilter={this.props.setTodosFilter}
        filterValue={filter}
        requestLists={this.props.requestLists}
        {...routeProps}
      />
    )
  }

  renderTodoPage = routeProps => {
    const todo = this.props.todos.activeTodo
    return (
      <TodoPage
        {...routeProps}
        getTodo={this.getTodo}
        todo={todo}
        lists={this.props.lists}
        toggleCompleted={this.toggleCompleted}
        updateTodo={this.updateTodo}
        deleteTodo={this.deleteTodo}
        removeTagFromTodo={this.removeTagFromTodo}
        requestAddTag={this.requestAddTag}
        requestLists={this.props.requestLists}
      />
    )
  }

  renderTagsList = () => <TagsList type="todos" />

  render() {
    const { path } = this.props.match
    return (
      <>
        <Link to="/todos/tags">All Tags</Link>
        <Switch>
          <Route path={`${path}/tags`} render={this.renderTagsList} />
          <Route path={`${path}/:id`} render={this.renderTodoPage} />
          <Route path={path} render={this.renderTodos} />
        </Switch>
      </>
    )
  }
}

const mapStateToProps = ({ todos, lists }) => ({ todos: todos, lists: lists.lists })

const mapDispatchToProps = dispatch => {
  return {
    addTodo: todo => dispatch({ type: REQUEST_ADD_TODO, todo: todo }),
    fetchTodos: () => dispatch({ type: REQUEST_FETCH_TODOS }),
    fetchTodosByTags: tagsQueryString =>
      dispatch({ type: REQUEST_FETCH_TODOS_BY_TAGS, payload: tagsQueryString }),
    fetchTodo: id => dispatch({ type: REQUEST_FETCH_TODO, id }),
    updateTodo: (id, todoUpdates) =>
      dispatch({
        type: REQUEST_UPDATE_TODO,
        payload: { id, todoUpdates }
      }),
    toggleTodoCompleted: id =>
      dispatch({
        type: REQUEST_TOGGLE_TODO_COMPLETED,
        payload: { id }
      }),
    deleteTodo: id =>
      dispatch({
        type: REQUEST_DELETE_TODO,
        payload: { id }
      }),
    setTodosFilter: filter => dispatch({ type: SET_TODOS_FILTER, payload: { filter } }),
    removeTagFromTodo: (id, tag) =>
      dispatch({ type: REQUEST_REMOVE_TAG, payload: { id, tag } }),
    requestAddTag: (id, tag) => dispatch({ type: REQUEST_ADD_TAG, payload: { id, tag } }),
    requestLists: () => dispatch({ type: REQUEST_LISTS })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodosContainer)
