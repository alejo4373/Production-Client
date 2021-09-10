import React from 'react';
import { Link } from 'react-router-dom';
import { useListsState } from './ListContainer.hooks';

const Lists = () => {
  const { lists } = useListsState()

  if (!lists.length) return <div>Loading...</div>

  return (
    <div className="lists">
      <h2>Lists</h2>
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
