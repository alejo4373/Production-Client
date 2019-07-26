import { call, put, takeEvery } from 'redux-saga/effects';
import { 
  RECEIVE_JOURNAL_ENTRY,
  RECEIVE_ERROR,
  REQUEST_ADD_JOURNAL_ENTRY,
  REQUEST_JOURNAL_ENTRIES,
  RECEIVE_JOURNAL_ENTRIES
  } from '../actionTypes'
import * as api from '../../api';

function* addJournalEntry(action) {
  try {
    const { data } = yield call(api.addJournalEntry, action.journalEntry)
    yield put({ 
      type: RECEIVE_JOURNAL_ENTRY,
      payload: { journalEntry: data.payload }
    });
  } catch (err) {
    yield put({ type: RECEIVE_ERROR, error: action.error });
  }
 }

function* fetchJournalEntries(action) {
  try {
    const { data } = yield call(api.fetchJournalEntries)
    yield put({ 
      type: RECEIVE_JOURNAL_ENTRIES,
      payload: { entries: data.payload }
    });
  } catch (err) {
    yield put({ type: RECEIVE_ERROR, error: action.error });
  }
 }

 function* journalSagasWatcher() {
   yield takeEvery(REQUEST_ADD_JOURNAL_ENTRY, addJournalEntry)
   yield takeEvery(REQUEST_JOURNAL_ENTRIES, fetchJournalEntries) //Can the watcher do this? watch multiple sagas?
 }

 export default journalSagasWatcher;
