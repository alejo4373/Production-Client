import React, { Component } from 'react';
import { connect } from 'react-redux';
import { JournalForm } from './Journal'
import { Redirect } from 'react-router';
import TodosList from './Todos/TodosList';
import "../styles/Journal.css"
import {
  REQUEST_ADD_JOURNAL_ENTRY,
  REQUEST_JOURNAL_ENTRIES,
  REQUEST_UPDATE_JOURNAL_ENTRY
} from '../store/actionTypes/journal';
import { REQUEST_FETCH_TODOS } from '../store/actionTypes/todos';
import { getDateString } from '../util';
import JournalEntry from './Journal/JournalEntry';

class JournalPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: "",
      tags: "",
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { text, tags } = this.state;

    if (text && tags.length) {
      const journalEntry = {
        text: text.trim(),
        tags: tags.split(',').map(t => t.trim()) // Temporary while I implement tag suggestions
      }

      this.props.addJournalEntry(journalEntry);
      this.setState({
        text: '',
        tags: ''
      })
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target

    this.setState({
      [name]: value
    })
  }

  componentDidMount = () => {
    let { date } = this.props.match.params
    let client_tz = Intl.DateTimeFormat().resolvedOptions().timeZone

    if (date === "today") {
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

  updateJournalEntry = (id, updates) => {
    this.props.requestUpdateJournalEntry(id, updates)
  }

  render() {
    const { entries, todos, match: { params } } = this.props;
    const { text, tags } = this.state;

    const [year, month, day] = params.date.split('-')
    let date = new Date(year, parseInt(month) - 1, day)
    let dateStr;

    if (params.date === 'today') {
      dateStr = `Today ${(new Date()).toDateString()}`
    } else if (!isNaN(date.getTime())) {
      dateStr = date.toDateString();
    } else {
      return <Redirect to={`/journal/today`} />
    }

    return (
      <div className="journal-page">
        <h2>{dateStr}</h2>
        <JournalForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          entryText={text}
          entryTags={tags}
        />
        <div>
          <ul className="list">{
            entries.map(entry => (
              <JournalEntry
                key={entry.id}
                entry={entry}
                updateJournalEntry={this.updateJournalEntry}
              />
            ))
          }</ul>
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
