import React from 'react'
import { AllLists } from '../components/Lists/AllLists'
import { useListsState, useRequestAddList } from './ListContainer.hooks'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { ListPage } from '../components/Lists/ListPage'

const Lists = () => {
  const { lists, loading } = useListsState()
  const requestAddList = useRequestAddList()
  const match = useRouteMatch()

  const handleSubmit = listName => {
    requestAddList(listName)
  }

  if (loading) return <p>Loading...</p>
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
