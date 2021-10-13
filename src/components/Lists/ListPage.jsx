import React from 'react'
import { useLocation, useRouteMatch } from 'react-router'
import { useListPageState } from './ListPage.hooks'
import Todos from '../Todos'
import { applyTodosFilter } from '../../util/todos'

export const ListPage = ({ lists }) => {
  const match = useRouteMatch()
  const location = useLocation()
  const { id } = match.params
  const { todos, addTodo, requestFetchTodos, toggleTodoCompleted, setTodosFilter } =
    useListPageState(id)
  const filteredTodos = applyTodosFilter(todos.todos, todos.filter)
  const currList = lists.find(list => list.id === parseInt(id))
  return (
    <div>
      <Todos
        title={currList.name}
        todos={filteredTodos}
        isInList={true}
        toggleCompleted={toggleTodoCompleted}
        getAllTodos={requestFetchTodos}
        addTodo={addTodo}
        setTodosFilter={setTodosFilter}
        filterValue={todos.filter}
        location={location}
      />
    </div>
  )
}
