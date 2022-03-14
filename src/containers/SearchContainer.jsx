import * as api from '../api'
import { SearchForm } from '../components/Search/SearchForm'
import JournalEntry from '../components/Journal/JournalEntry'
import React, { useState } from 'react'
import TodosList from '../components/Todos/TodosList'

const SearchContainer = () => {
  /*
   *  I'm abstaining of using redux for the state management of the Search
   *  This state I don't forsee having to share widely nor having to travel
   *  deeply in the component tree nor needed to be remembered across route
   *  transitions, therefore I will use only React's built-in state for now
   */

  const itemOptions = {
    ALL: 'ALL',
    TODOS: 'TODOS',
    JOURNAL: 'JOURNAL'
  }

  const [searchTerms, setSearchTerms] = useState('')
  const [itemsSelectedOption, setItemsSelectedOption] = useState(itemOptions.ALL)
  const [todos, setTodos] = useState([])
  const [entries, setEntries] = useState([])

  const handleSubmit = async e => {
    e.preventDefault()
    let todosResults = []
    let entriesResults = []
    if (itemsSelectedOption === itemOptions.ALL) {
      todosResults = (await api.fetchTodos({ text: searchTerms })).data.payload.todos
      entriesResults = (await api.fetchJournalEntries({ text: searchTerms })).data.payload
    } else if (itemsSelectedOption === itemOptions.TODOS) {
      todosResults = (await api.fetchTodos({ text: searchTerms })).data.payload.todos
    } else if (itemsSelectedOption === itemOptions.JOURNAL) {
      entriesResults = (await api.fetchJournalEntries({ text: searchTerms })).data.payload
    }

    setTodos(todosResults)
    setEntries(entriesResults)
  }

  return (
    <div className="search-container">
      <SearchForm
        handleSubmit={handleSubmit}
        searchTerms={searchTerms}
        setSearchTerms={setSearchTerms}
        itemsSelectedOption={itemsSelectedOption}
        setItemsSelectedOption={setItemsSelectedOption}
      />
      <div>
        <ul className="list">
          {entries.map(entry => (
            <JournalEntry key={entry.id} entry={entry} showFullDate={true} />
          ))}
        </ul>
      </div>
      <TodosList todos={todos} title="Todos" minimal />
    </div>
  )
}

export default SearchContainer
