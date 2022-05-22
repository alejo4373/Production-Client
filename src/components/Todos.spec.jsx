import { render } from '@testing-library/react'
import React from 'react'
import TodoForm from './Todos/TodoForm'
import Todos from './Todos'
import TodosFilter from './Todos/TodosFilter'
import TodosList from './Todos/TodosList'

const sampleTodos = [
  {
    id: 806,
    text: '<div>Journal for 1 hour</div>',
    completed: false,
    value: 100,
    owner_id: 1,
    created_at: '2022-05-22T21:44:29.214Z',
    updated_at: '2022-05-22T21:44:29.214Z',
    completed_at: null,
    due_at: null,
    list_id: 1,
    tags: ['untagged']
  },
  {
    id: 797,
    text: '<div>Walk dog</div>',
    completed: false,
    value: 100,
    owner_id: 1,
    created_at: '2022-03-12T18:11:34.106Z',
    updated_at: '2022-03-12T18:11:54.180Z',
    completed_at: null,
    due_at: null,
    list_id: 1,
    tags: [null]
  },
  {
    id: 793,
    text: '<div>Work on ticket</div>',
    completed: false,
    value: 200,
    owner_id: 1,
    created_at: '2022-02-20T18:28:03.590Z',
    updated_at: '2022-02-20T18:37:24.039Z',
    completed_at: null,
    due_at: null,
    list_id: 1,
    tags: ['work']
  }
]

const defaultProps = {
  location: { search: '' },
  todos: [],
  title: 'All Todos',
  toggleCompleted: jest.fn(),
  filterValue: 'all',
  setTodosFilter: jest.fn(),
  isInList: false,
  currListId: null,
  getTodosByTags: jest.fn(),
  getAllTodos: jest.fn(),
  requestLists: undefined,
  addTodo: jest.fn()
}

/* Child component Mocks */
jest.mock('./Todos/TodoForm', () => ({
  __esModule: true,
  default: jest.fn(() => null)
}))

jest.mock('./Todos/TodosFilter', () => ({
  __esModule: true,
  default: jest.fn(() => null)
}))

jest.mock('./Todos/TodosList', () => ({
  __esModule: true,
  default: jest.fn(() => null)
}))

const setup = propOverrides => {
  render(<Todos {...defaultProps} {...propOverrides} />)
}

beforeEach(jest.clearAllMocks)

describe(Todos, () => {
  it('Calls requestLists on mount if requestLists passed', () => {
    const requestLists = jest.fn()
    setup({ requestLists })
    expect(requestLists).toHaveBeenCalled()
  })

  it('Calls getAllTodos on mount if there are no tags', () => {
    const getAllTodos = jest.fn()
    setup({ getAllTodos })
    expect(getAllTodos).toHaveBeenCalled()
  })

  it('Calls getTodosByTags on mount if there are tags in query string', () => {
    const getTodosByTags = jest.fn()
    setup({ getTodosByTags, location: { search: '?tags[]=misc&tags[]=personal' } })
    expect(getTodosByTags).toHaveBeenCalled()
  })

  describe('Renders a TodoForm', () => {
    it('Passes expected props', () => {
      setup()
      expect(TodoForm).toHaveBeenLastCalledWith(
        expect.objectContaining({
          lists: defaultProps.lists,
          isInList: defaultProps.isInList,
          cta: 'Add',
          resetOnSubmit: true
        }),
        expect.anything()
      )
    })

    it('calls addTodo if todo has text and value properties', () => {
      const addTodo = jest.fn()
      setup({ addTodo })
      const [TodoFormProps] = TodoForm.mock.calls[0]
      TodoFormProps.handleSubmit({
        todoText: 'Do laundry',
        todoValue: 100,
        tags: '',
        listId: '1'
      })
      expect(addTodo).toHaveBeenCalledWith({
        text: 'Do laundry',
        value: 100,
        completed: false,
        tags: [],
        list_id: '1'
      })
    })

    it('Does not call addTodo if todo is missing text or value properties', () => {
      const addTodo = jest.fn()
      setup({ addTodo })
      const [TodoFormProps] = TodoForm.mock.calls[0]
      TodoFormProps.handleSubmit({
        todoText: ' ',
        todoValue: 100,
        tags: '',
        listId: '1'
      })
      expect(addTodo).not.toHaveBeenCalled()
    })

    it('calls addTodo with listId', () => {
      const addTodo = jest.fn()
      setup({ addTodo })
      const [TodoFormProps] = TodoForm.mock.calls[0]
      TodoFormProps.handleSubmit({
        todoText: 'Do laundry',
        todoValue: 100,
        tags: '',
        listId: '200'
      })
      expect(addTodo).toHaveBeenCalledWith(expect.objectContaining({ list_id: '200' }))
    })

    it('calls addTodo with currListId if Todos is rendered in a List', () => {
      const addTodo = jest.fn()
      setup({ addTodo, isInList: true, currListId: 100 })
      const [TodoFormProps] = TodoForm.mock.calls[0]
      TodoFormProps.handleSubmit({
        todoText: 'Do laundry',
        todoValue: 100,
        tags: '',
        listId: '-1'
      })
      expect(addTodo).toHaveBeenCalledWith(expect.objectContaining({ list_id: 100 }))
    })

    it('calls addTodo with trimmed todoText', () => {
      const addTodo = jest.fn()
      setup({ addTodo })
      const [TodoFormProps] = TodoForm.mock.calls[0]
      TodoFormProps.handleSubmit({
        todoText: '\n\nDo laundry  ',
        todoValue: 100,
        tags: '',
        listId: '-1'
      })
      expect(addTodo).toHaveBeenCalledWith(
        expect.objectContaining({ text: 'Do laundry' })
      )
    })

    it('calls addTodo with split tags as an array', () => {
      const addTodo = jest.fn()
      setup({ addTodo })
      const [TodoFormProps] = TodoForm.mock.calls[0]
      TodoFormProps.handleSubmit({
        todoText: 'Do laundry',
        todoValue: 100,
        tags: 'misc, personal,chores',
        listId: '-1'
      })
      expect(addTodo).toHaveBeenCalledWith(
        expect.objectContaining({ tags: ['misc', 'personal', 'chores'] })
      )
    })
  })

  describe('Renders a TodosFilter', () => {
    it('Calls setTodosFilter when handleFilterChange prop is called', () => {
      const setTodosFilter = jest.fn()
      setup({ setTodosFilter })
      const [TodosFilterProps] = TodosFilter.mock.calls[0]
      TodosFilterProps.handleFilterChange({ target: { value: 'completed' } })
      expect(setTodosFilter).toHaveBeenCalledWith('completed')
    })

    it('Has filterValue prop', () => {
      setup({ filterValue: 'all' })
      const [TodosFilterProps] = TodosFilter.mock.calls[0]
      expect(TodosFilterProps.filterValue).toBe('all')
    })
  })

  describe('Renders a TodosList', () => {
    it('has toggleCompeted in handlers prop', () => {
      const toggleCompleted = jest.fn()
      setup({ toggleCompleted })

      const [TodosListProps] = TodosList.mock.calls[0]
      TodosListProps.handlers.toggleCompleted()
      expect(toggleCompleted).toHaveBeenCalled()
    })

    it('has todos and title props', () => {
      setup({ todos: sampleTodos })
      const [TodosListProps] = TodosList.mock.calls[0]
      expect(TodosListProps.title).toBe('Todos')
      expect(TodosListProps.todos).toEqual(sampleTodos)
    })
  })
})
