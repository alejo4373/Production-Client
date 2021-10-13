import React, { Component } from 'react';
import { connect } from 'react-redux';
import { JournalEntryEditor } from './Journal'
import { Redirect, Link } from 'react-router-dom';
import TodosList from './Todos/TodosList';
import "../styles/Journal.css"
import {
  REQUEST_ADD_JOURNAL_ENTRY,
  REQUEST_JOURNAL_ENTRIES,
  REQUEST_UPDATE_JOURNAL_ENTRY
} from '../store/actionTypes/journal';
import { REQUEST_FETCH_TODOS } from '../store/actionTypes/todos';
import { getDateString, getMonthDayString, sanitizeTags } from '../util';
import JournalEntry from './Journal/JournalEntry';

class JournalPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      tags: ''
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const { text, tags } = this.state

    if (text && tags.length) {
      const journalEntry = {
        text: text.trim(),
        tags: sanitizeTags(tags.split(','))
      }

      this.props.addJournalEntry(journalEntry)
      this.setState({
        text: '',
        tags: ''
      })
    }
  }

  handleTagsChange = tags => {
    this.setState({ tags })
  }

  handleEntryText = content => {
    this.setState({
      text: content
    })
  }

  fetchTodosAndJournalEntries = () => {
    let { date } = this.props.match.params
    let client_tz = Intl.DateTimeFormat().resolvedOptions().timeZone

    if (date === 'today') {
      let today = getDateString(new Date())
      this.props.fetchJournalEntries(today, client_tz)
      this.props.fetchTodos({
        completed_at: today,
        client_tz
      })
    } else {
      this.props.fetchJournalEntries(date, client_tz)
      this.props.fetchTodos({
        completed_at: date,
        client_tz
      })
    }
  }

  componentDidMount() {
    this.fetchTodosAndJournalEntries()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.date !== this.props.match.params.date) {
      this.fetchTodosAndJournalEntries()
    }
  }

  updateJournalEntry = (id, updates) => {
    this.props.requestUpdateJournalEntry(id, updates)
  }

  render() {
    const {
      entries,
      todos,
      match: { params }
    } = this.props
    const { text, tags } = this.state

    let date
    let dateStr
    if (params.date === 'today') {
      date = new Date()
      dateStr = `Today ${new Date().toDateString()}`
    } else {
      const [year, month, day] = params.date.split('-')
      date = new Date(year, parseInt(month) - 1, day)
      if (!isNaN(date.getTime())) {
        dateStr = date.toDateString()
      } else {
        return <Redirect to={`/journal/today`} />
      }
    }

    const prevDate = new Date(date)
    prevDate.setDate(prevDate.getDate() - 1)
    const prevDateStr = getDateString(prevDate)
    const prevMMDD = getMonthDayString(prevDate)

    const nextDate = new Date(date)
    nextDate.setDate(nextDate.getDate() + 1)
    const nextDateStr = getDateString(nextDate)
    const nextMMDD = getMonthDayString(nextDate)

    return (
      <div className="journal-page">
        <nav>
          <Link to={`${prevDateStr}`}>{`←${prevMMDD}`}</Link>{' '}
          <Link to={`${nextDateStr}`}>{`${nextMMDD}→`}</Link>
        </nav>
        <h2>{dateStr}</h2>
        <JournalEntryEditor
          handleEntryText={this.handleEntryText}
          handleTagsChange={this.handleTagsChange}
          handleSubmit={this.handleSubmit}
          entryText={text}
          entryTags={tags}
        />
        <div>
          <ul className="list">
            {entries.map(entry => (
              <JournalEntry
                key={entry.id}
                entry={entry}
                updateJournalEntry={this.updateJournalEntry}
              />
            ))}
          </ul>
        </div>
        <TodosList todos={todos} title="Todos Completed" minimal />
      </div>
    )
  }
}

const mapStateToProps = ({ journal, todos }) => ({
  entries: journal.entries,
  todos: todos.todos
})

const mapDispatchToProps = (dispatch) => {
  return {
    addJournalEntry: (journalEntry) => dispatch({
      type: REQUEST_ADD_JOURNAL_ENTRY, journalEntry
    }),
    fetchJournalEntries: (date, client_tz) => dispatch({
      type: REQUEST_JOURNAL_ENTRIES,
      payload: { date, client_tz }
    }),
    fetchTodos: (params) => dispatch({
      type: REQUEST_FETCH_TODOS,
      payload: params
    }),
    requestUpdateJournalEntry: (id, updates) => dispatch({
      type: REQUEST_UPDATE_JOURNAL_ENTRY,
      payload: { id, updates }
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JournalPage);
