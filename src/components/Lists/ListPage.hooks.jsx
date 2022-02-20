import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  REQUEST_ADD_TODO,
  REQUEST_FETCH_TODOS,
  REQUEST_TOGGLE_TODO_COMPLETED,
  SET_TODOS_FILTER
} from '../../store/actionTypes/todos'

export const useListPageState = listId => {
  const todos = useSelector(rootState => rootState.todos)
  const dispatch = useDispatch()

  const requestFetchTodos = useCallback(() => {
    dispatch({
      type: REQUEST_FETCH_TODOS,
      payload: { list_id: listId }
    })
  }, [dispatch, listId])

  const addTodo = todo => {
    dispatch({ type: REQUEST_ADD_TODO, todo: todo })
  }

  const toggleTodoCompleted = id => {
    dispatch({
      type: REQUEST_TOGGLE_TODO_COMPLETED,
      payload: { id }
    })
  }

  const setTodosFilter = filter => {
    dispatch({
      type: SET_TODOS_FILTER,
      payload: { filter }
    })
  }

  return { todos, addTodo, requestFetchTodos, toggleTodoCompleted, setTodosFilter }
}
