import React, { Component } from 'react';
import { connect } from 'react-redux';
import { JournalForm, JournalEntriesList } from './Journal'
import { Redirect } from 'react-router';
import TodosList from './Todos/TodosList';
import "../styles/Journal.css"
import { REQUEST_ADD_JOURNAL_ENTRY, REQUEST_JOURNAL_ENTRIES } from '../store/actionTypes/journal';
import { REQUEST_FETCH_TODOS } from '../store/actionTypes/todos';

class JournalPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      tag: "",
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

  getTodaysDateString = () => {
    const padDayOrMonth = (number) => (number < 10) ? "0" + number : number

    const todaysDate = new Date()
    const year = todaysDate.getFullYear()
    const month = padDayOrMonth(todaysDate.getMonth() + 1)
    const day = padDayOrMonth(todaysDate.getDate())

    return `${year}-${month}-${day}`
  }

  componentDidMount = () => {
    let { date } = this.props.match.params
    if (date === "today") {
      let today = this.getTodaysDateString()
      this.props.fetchJournalEntries(today)
      this.props.fetchTodos({ completed_at: today })
    } else {
      this.props.fetchJournalEntries(date)
      this.props.fetchTodos({ completed_at: date })
    }
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
        <JournalEntriesList entries={entries} />
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
    fetchJournalEntries: (date) => dispatch({
      type: REQUEST_JOURNAL_ENTRIES,
      payload: { date }
    }),
    fetchTodos: (params) => dispatch({
      type: REQUEST_FETCH_TODOS,
      payload: params
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JournalPage);