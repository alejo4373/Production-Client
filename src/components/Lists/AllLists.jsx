import React from 'react'
import { Link } from 'react-router-dom';
import { NewListForm } from './NewListForm';

export const AllLists = ({ lists, handleSubmit }) => {
  return (
    <div className="lists">
      <h2>Lists</h2>
      <NewListForm handleSubmit={handleSubmit} />
      <ul>
        {lists.map(list => (
          <li key={list.id}>
            <Link to={`/lists/${list.id}`}>{list.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
