import React from 'react'
import { AllLists } from '../components/Lists/AllLists'
import { useListsState, useRequestAddList } from './ListContainer.hooks'
import { Switch, Route, useLocation, useRouteMatch } from 'react-router-dom'
import { ListPage } from '../components/Lists/ListPage'

const Lists = () => {
  const { lists, loading } = useListsState()
  const requestAddList = useRequestAddList()
  const match = useRouteMatch()

  const handleSubmit = listName => {
    requestAddList(listName)
  }

  return (
    <Switch>
      <Route path={`${match.path}/:id`}>
        <ListPage lists={lists} />
      </Route>
      <Route path="/">
        <AllLists lists={lists} loading={loading} handleSubmit={handleSubmit} />
      </Route>
    </Switch>
  )
}

export default Lists
