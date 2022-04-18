import * as TodoFormExport from '../TodoForm'
import * as api from '../../../api'
import { BrowserRouter } from 'react-router-dom'
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within
} from '@testing-library/react'
import { sampleTodo } from './fixtures'
import React from 'react'
import TodoPage from '../TodoPage'
import userEvent from '@testing-library/user-event'

const setup = ({
  getTodo = jest.fn(),
  todo = null,
  lists = [],
  toggleCompleted = jest.fn(),
  updateTodo = jest.fn(),
  deleteTodo = jest.fn(),
  requestLists = jest.fn(),
  match = { params: { id: '100' } },
  ...rest
}) => {
  render(
    <BrowserRouter>
      <TodoPage
        getTodo={getTodo}
        todo={todo}
        lists={lists}
        toggleCompleted={toggleCompleted}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
        requestLists={requestLists}
        match={match} /* ReactRouter route props */
        {...rest}
      />
    </BrowserRouter>
  )
}

/* Mocks */
const fetchTodo = jest
  .spyOn(api, 'fetchTodo')
  .mockResolvedValue({ data: { payload: { todo: sampleTodo } } })

const requestAddTag = jest.spyOn(api, 'requestAddTag').mockResolvedValue({
  data: {
    payload: { addedTag: { id: 613, name: 'past', owner_id: 1 } },
    message: 'Tag `chore` added to todo',
    error: false
  }
})

const requestRemoveTag = jest.spyOn(api, 'requestRemoveTag').mockResolvedValue({
  data: {
    payload: { removedTag: { id: 623, todo_id: 798, tag_id: 224, name: 'hello' } },
    message: 'Tag `hello` removed from todo',
    error: false
  }
})

const alert = jest.spyOn(window, 'alert').mockImplementation(() => jest.fn())

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

  it('Allows adding a tag to a todo', async () => {
    requestAddTag.mockResolvedValueOnce({
      data: {
        payload: { addedTag: { id: 613, name: 'city', owner_id: 1 } },
        message: 'Tag `chore` added to todo',
        error: false
      }
    })

    setup({})

    await waitForElementToBeRemoved(screen.getByText('Loading...'))
    userEvent.type(screen.getByPlaceholderText('new-tag'), 'city')
    userEvent.click(screen.getByText('Add Tag'))
    expect(requestAddTag).toHaveBeenCalled()
    await waitFor(() => {
      expect(screen.queryByText('city')).toBeInTheDocument()
    })
  })

  it('Allows removing a tag from a todo', async () => {
    requestRemoveTag.mockResolvedValueOnce({
      data: {
        payload: { removedTag: { id: 623, todo_id: 798, tag_id: 224, name: 'upon' } },
        message: 'Tag `upon` removed from todo',
        error: false
      }
    })
    setup({})

    await waitForElementToBeRemoved(screen.getByText('Loading...'))
    const [firstTag] = screen.getAllByTestId('tag') // upon
    userEvent.click(within(firstTag).getByRole('button', '×'))
    expect(requestRemoveTag).toHaveBeenCalled()

    await waitFor(() => {
      expect(screen.queryByText('upon')).not.toBeInTheDocument()
    })
  })
})
