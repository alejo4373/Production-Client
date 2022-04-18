import {
  RECEIVE_TODO,
  RECEIVE_TODOS,
  REMOVE_TODO,
  SET_ACTIVE_TODO,
  SET_TODOS_FILTER,
  UPDATE_TODO
} from '../actionTypes/todos'

const initialState = {
  todos: [],
  filter: 'all',
  activeTodo: null
}

const todosReducer = (state = initialState, { type, payload }) => {
  const { todo, todos, filter } = payload || {}
  let newState = { ...state }
  const { activeTodo } = newState

  switch (type) {
    case SET_TODOS_FILTER:
      newState.filter = filter
      return newState

    case SET_ACTIVE_TODO:
      newState.activeTodo = todo
      return newState

    case RECEIVE_TODO:
      newState.todos = [todo, ...newState.todos]
      return newState

    case RECEIVE_TODOS:
      newState.todos = todos
      newState.filter = 'all'
      return newState

    case REMOVE_TODO:
      if (activeTodo && todo.id === activeTodo.id) {
        newState.activeTodo = null
      }

      newState.todos = newState.todos.filter(t => t.id !== todo.id)
      return newState

    case UPDATE_TODO:
      // If todo being updated is the active todo (being rendered in TodoPage)
      // set activeTodo to the updated todo
      if (activeTodo && todo.id === activeTodo.id) {
        // Merge current activeTodo with todo updates e.g. todos was completed but tags haven't changed
        newState.activeTodo = {
          ...newState.activeTodo,
          ...todo
        }
      }

      newState.todos = newState.todos.map(t => {
        if (t.id === todo.id) return todo
        return t
      })
      return newState

    default:
      return state
  }
}

export default todosReducer
