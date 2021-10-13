export const applyTodosFilter = (todos, filter) => {
  switch (filter) {
    case "completed":
      return todos.filter(todo => todo.completed);
    case "incomplete":
      return todos.filter(todo => !todo.completed);
    case "all":
    default:
      return todos
  }
}
