import React from 'react'

type TodosFilterProps = {
  handleFilterChange: (e: React.ChangeEvent) => void
  filterValue: string
}

const TodosFilter = ({
  handleFilterChange,
  filterValue
}: TodosFilterProps): JSX.Element => {
  return (
    <div>
      <input
        id="completed"
        value="completed"
        type="radio"
        name="todosFilter"
        onChange={handleFilterChange}
        checked={filterValue === 'completed'}
      />
      <label htmlFor="completed">Completed</label>

      <input
        id="incomplete"
        value="incomplete"
        type="radio"
        name="todosFilter"
        onChange={handleFilterChange}
        checked={filterValue === 'incomplete'}
      />
      <label htmlFor="incomplete">Incomplete</label>

      <input
        id="all"
        value="all"
        type="radio"
        name="todosFilter"
        onChange={handleFilterChange}
        checked={filterValue === 'all'}
      />
      <label htmlFor="all">All</label>
    </div>
  )
}

export default TodosFilter
