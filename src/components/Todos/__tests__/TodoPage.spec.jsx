import * as TodoFormExport from '../TodoForm'
import * as api from '../../../api'
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react'
import { sampleTodo } from './fixtures'
import React from 'react'
import TodoPage from '../TodoPage'

const setup = ({
  getTodo = jest.fn(),
  todo = null,
  lists = [],
  toggleCompleted = jest.fn(),
  updateTodo = jest.fn(),
  deleteTodo = jest.fn(),
  removeTagFromTodo = jest.fn(),
  requestAddTag = jest.fn(),
  requestLists = jest.fn(),
  match = { params: { id: '100' } },
  ...rest
}) => {
  render(
    <TodoPage
      getTodo={getTodo}
      todo={todo}
      lists={lists}
      toggleCompleted={toggleCompleted}
      updateTodo={updateTodo}
      deleteTodo={deleteTodo}
      removeTagFromTodo={removeTagFromTodo}
      requestAddTag={requestAddTag}
      requestLists={requestLists}
      match={match} /* ReactRouter route props */
      {...rest}
    />
  )
}

/* Mocks */
const fetchTodo = jest
  .spyOn(api, 'fetchTodo')
  .mockResolvedValue({ data: { payload: { todo: sampleTodo } } })

/* Subcomponent Mocks */
const TodoForm = jest.spyOn(TodoFormExport, 'default').mockImplementation(() => null)

describe('<TodoPage />', () => {
  it('Renders TodoForm', async () => {
    setup({})
    await waitFor(() => {
      expect(TodoForm).toHaveBeenCalled()
    })
  })

  it('Fetches the todo with the id from the route params', async () => {
    fetchTodo.mockResolvedValue({ data: { payload: { todo: sampleTodo } } })
    setup({ match: { params: { id: '1' } } })
    await waitForElementToBeRemoved(screen.getByText('Loading...'))
    expect(fetchTodo).toHaveBeenCalledWith('1')
  })
})
