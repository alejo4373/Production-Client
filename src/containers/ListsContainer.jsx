import React from 'react';
import { Link } from 'react-router-dom';
import { NewListForm } from '../components/Lists/NewListForm';
import { useListsState, useRequestAddList } from './ListContainer.hooks';

const Lists = () => {
  const { lists } = useListsState()
  const requestAddList = useRequestAddList()

  if (!lists.length) return <div>Loading...</div>

  const handleSubmit = (listName) => {
    requestAddList(listName)
  }

  return (
    <div className="lists">
      <h2>Lists</h2>
      <NewListForm handleSubmit={handleSubmit} />
      <ul>
        {lists.map(list => (
          <li key={list.id}>
            <Link to={`'/lists/${list.id}`}>{list.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Lists
