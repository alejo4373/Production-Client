import { render, waitFor } from '@testing-library/react'
import React from 'react'
import TodoForm from '../../Todos/TodoForm'
import Todos from '../../Todos'
import TodosFilter from '../../Todos/TodosFilter'
import TodosList from '../../Todos/TodosList'

/* Component mocks */
jest.mock('../../Todos/TodoForm', () => jest.fn(() => null))
jest.mock('../../Todos/TodosFilter', () => jest.fn(() => null))
jest.mock('../../Todos/TodosList', () => jest.fn(() => null))

const setup = propOverrides => {
  const props = {
    location: { search: '' },
    todos: [],
    title: 'My list',
    lists: [],
    toggleCompleted: jest.fn(),
    filterValue: '',
    inInList: false,
    getTodosByTags: jest.fn(),
    getAllTodos: jest.fn(),
    requestLists: jest.fn(),
    addTodo: jest.fn(),
    setTodosFilter: jest.fn(),
    ...propOverrides
  }
  render(<Todos {...props} />)
}

beforeEach(jest.clearAllMocks)

describe('Todos', () => {
  describe('On mount', () => {
    it('Requests all todos if there are no tags in the query', async () => {
      const getAllTodos = jest.fn()
      setup({ getAllTodos })
      await waitFor(() => {
        expect(getAllTodos).toHaveBeenCalled()
      })
    })

    it('Requests todos by tags if tags are found in the query', async () => {
      const getTodosByTags = jest.fn()
      const location = { search: 'tags[]=misc&tags[]=personal' }
      setup({ getTodosByTags, location })
      await waitFor(() => {
        expect(getTodosByTags).toHaveBeenCalledWith('tags[]=misc&tags[]=personal')
      })
    })
    it('Requests list if requestList is passed', async () => {
      const requestLists = jest.fn()
      setup({ requestLists })
      await waitFor(() => {
        expect(requestLists).toHaveBeenCalled()
      })
    })
  })

  it('Renders TodoForm and handleSubmit passed to it calls addTodo if todo has text and value', () => {
    const addTodo = jest.fn()
    setup({
      addTodo,
      isInList: true,
      resetOnSubmit: true,
      lists: [
        {
          id: 1,
          name: '1st List',
          created_at: '2022-02-13T19:40:14.419Z',
          owner_id: 1
        }
      ]
    })

    expect(TodoForm).toHaveBeenCalled()
    const TodoFormProps = TodoForm.mock.calls[0][0]
    TodoFormProps.handleSubmit({
      todoText: 'buy water',
      todoValue: '100',
      tags: '',
      listId: 0
    })
    expect(addTodo).toHaveBeenCalled()
    expect(TodoFormProps.lists).toEqual([
      {
        id: 1,
        name: '1st List',
        created_at: '2022-02-13T19:40:14.419Z',
        owner_id: 1
      }
    ])
    expect(TodoFormProps.cta).toBe('Add')
    expect(TodoFormProps.isInList).toBe(true)
    expect(TodoFormProps.resetOnSubmit).toBe(true)
  })

  it('Renders  TodosFilter ', () => {
    const setTodosFilter = jest.fn()
    setup({ filterValue: 'completed', setTodosFilter })

    expect(TodosFilter).toHaveBeenCalled()
    const [TodosFilterProps] = TodosFilter.mock.calls[0]
    TodosFilterProps.handleFilterChange({ target: { value: 'all' } })
    expect(setTodosFilter).toHaveBeenCalledWith('all')
    expect(TodosFilterProps.filterValue).toBe('completed')
  })

  it('Renders TodosList', () => {
    setup({})
    expect(TodosList).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Todos',
        todos: [],
        handlers: { toggleCompleted: expect.any(Function) }
      }),
      expect.objectContaining({})
    )
  })
})
