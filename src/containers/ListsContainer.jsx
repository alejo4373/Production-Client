import React from 'react'
import { AllLists } from '../components/Lists/AllLists'
import { useListsState, useRequestAddList } from './ListContainer.hooks'
import { Switch, Route, useLocation, useRouteMatch } from 'react-router-dom'
import { ListPage } from '../components/Lists/ListPage'

const Lists = () => {
  const { lists } = useListsState()
  const requestAddList = useRequestAddList()
  const location = useLocation()
  const match = useRouteMatch()

  if (!lists.length) return <div>Loading...</div>

  const handleSubmit = listName => {
    requestAddList(listName)
  }

  return (
    <Switch>
      <Route path={`${match.path}/:id`}>
        <ListPage lists={lists} />
      </Route>
      <Route path="/">
        <AllLists lists={lists} handleSubmit={handleSubmit} />
      </Route>
    </Switch>
  )
}

export default Lists
