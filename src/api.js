import axios from 'axios';

export const addTodo = (todo) => axios.post('/api/todos', todo)
export const fetchTodos = (params) => axios.get('/api/todos', { params })
export const fetchTodosByTags = (tagsQueryString) => axios.get(`/api/todos/byTags${tagsQueryString}`)
export const fetchTodo = (id) => axios.get(`/api/todos/${id}`)
export const updateTodo = (id, updates) => axios.patch(`/api/todos/${id}`, updates)
export const deleteTodo = (id) => axios.delete(`/api/todos/${id}`)
export const toggleTodoCompleted = (id) => axios.post(`/api/todos/${id}/toggle-completed`)
export const removeTagFromTodo = (id, tag) => axios.delete(`/api/todos/${id}/tags/${tag}`)
export const requestAddTag = (id, tag) => axios.post(`/api/todos/${id}/tags`, {
  name: tag
})
export const requestLists = () => axios.get('/api/lists')
export const requestAddList = (name) => axios.post('/api/lists', { name })

export const addJournalEntry = (entry) => axios.post('/api/journal/entries', entry)
export const fetchJournalEntries = (params) => axios.get('/api/journal/entries', { params })
export const requestUpdateJournalEntry = (id, updates) => axios.patch(`/api/journal/entries/${id}`, updates)

export const login = (credentials) => axios.post('/api/auth/login', credentials)
export const signup = (userInfo) => axios.post('/api/auth/signup', userInfo)
export const logout = () => axios.get('/api/auth/logout')
export const getUser = () => axios.get('/api/auth/user')
