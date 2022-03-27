import { sanitizeTags } from '../util'
import React, { useEffect } from 'react'
import TodoForm from './Todos/TodoForm'
import TodosFilter from './Todos/TodosFilter'
import TodosList from './Todos/TodosList'

const Todos = ({
  location,
  todos,
  title,
  lists,
  toggleCompleted,
  filterValue,
  isInList,
  getTodosByTags,
  getAllTodos,
  requestLists,
  addTodo,
  setTodosFilter
}) => {
  useEffect(() => {
    const tagsQueryString = location.search
    let tags = new URLSearchParams(tagsQueryString).getAll('tags[]')
    if (tags.length) {
      getTodosByTags(tagsQueryString)
    } else {
      getAllTodos()
    }
  }, [location, getTodosByTags, getAllTodos])

  useEffect(() => {
    if (requestLists) requestLists()
  }, [requestLists])

  /* Event Handlers */
  const handleSubmit = ({ todoText, todoValue, tags, listId }) => {
    const todo = {
      text: todoText.trim(),
      value: todoValue,
      completed: false,
      tags: sanitizeTags(tags.split(',')),
      ...(listId !== '-1' && { list_id: listId })
    }

    if (todo.text && todo.value) {
      addTodo(todo)
    }
  }

  const handleFilterChange = e => {
    setTodosFilter(e.target.value)
  }

  return (
    <div className="todos-container">
      <h2>{title}</h2>
      <TodoForm
        lists={lists}
        isInList={isInList}
        handleSubmit={handleSubmit}
        cta="Add"
        resetOnSubmit
      />
      <hr />
      <TodosFilter handleFilterChange={handleFilterChange} filterValue={filterValue} />
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
export default Todos
