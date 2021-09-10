import {
  RECEIVE_TODO,
  REMOVE_TODO,
  RECEIVE_TODOS,
  SET_TODOS_FILTER,
  SET_ACTIVE_TODO,
  UPDATE_TODO,
  REMOVE_TAG,
  ADD_TAG,
} from '../actionTypes/todos';

const initialState = {
  todos: [],
  lists: [],
  filter: "all",
  activeTodo: null
}

const todosReducer = (state = initialState, { type, payload }) => {
  const { todo, todos, filter } = payload || {};
  let newState = { ...state };
  const { activeTodo } = newState

  switch (type) {
    case SET_TODOS_FILTER:
      newState.filter = filter
      return newState;

    case SET_ACTIVE_TODO:
      newState.activeTodo = todo
      return newState;

    case RECEIVE_TODO:
      newState.todos = [todo, ...newState.todos]
      return newState;

    case RECEIVE_TODOS:
      newState.todos = todos
      return newState;

    case REMOVE_TODO:
      if (activeTodo && todo.id === activeTodo.id) {
        newState.activeTodo = null;
      }

      newState.todos = newState.todos.filter(t => t.id !== todo.id);
      return newState;

    case UPDATE_TODO:
      // If todo being updated is the active todo (being rendered in TodoPage)
      // set activeTodo to the updated todo
      if (activeTodo && todo.id === activeTodo.id) {
        // Merge current activeTodo with todo updates e.g. todos was completed but tags haven't changed
        newState.activeTodo = {
          ...newState.activeTodo,
          ...todo
        };
      }

      newState.todos = newState.todos.map(t => {
        if (t.id === todo.id) return todo
        return t
      });
      return newState;

    case REMOVE_TAG:
      // Will only happen when removing a tag in the TodoPage
      const { removedTag } = payload
      const remainingTags = activeTodo.tags.filter(tag => tag !== removedTag.name)
      newState.activeTodo = {
        ...activeTodo,
        tags: remainingTags
      };
      return newState;

    case ADD_TAG:
      // Will only happen when removing a tag in the TodoPage
      const { addedTag } = payload
      newState.activeTodo = {
        ...activeTodo,
        tags: [...activeTodo.tags, addedTag.name]
      };
      return newState;

    default:
      return state;
  }
}

export default todosReducer;
