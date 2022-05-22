import { applyTodosFilter } from '../../util/todos'
import { useListPageState } from './ListPage.hooks'
import { useLocation, useRouteMatch } from 'react-router'
import React from 'react'
import Todos from '../Todos'

export const ListPage = ({ lists }) => {
  const match = useRouteMatch()
  const location = useLocation()
  const { id } = match.params
  const { todos, addTodo, requestFetchTodos, toggleTodoCompleted, setTodosFilter } =
    useListPageState(id)
  const filteredTodos = applyTodosFilter(todos.todos, todos.filter)
  const currList = lists.find(list => list.id === parseInt(id))

  if (!lists.length) return <p>Loading...</p>
  return (
    <div>
      <Todos
        title={currList.name}
        todos={filteredTodos}
        isInList={true}
        currListId={id}
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
