import { call, put, takeEvery } from 'redux-saga/effects';
import * as api from '../../api';
import { RECEIVE_ERROR } from '../actionTypes/comm';
import {
  RECEIVE_TODO,
  REMOVE_TODO,
  RECEIVE_TODOS,
  UPDATE_TODO,
  SET_ACTIVE_TODO,
  REMOVE_TAG,
  ADD_TAG,

  REQUEST_ADD_TODO,
  REQUEST_UPDATE_TODO,
  REQUEST_DELETE_TODO,
  REQUEST_FETCH_TODOS,
  REQUEST_FETCH_TODOS_BY_TAGS,
  REQUEST_FETCH_TODO,
  REQUEST_TOGGLE_TODO_COMPLETED,
  REQUEST_REMOVE_TAG,
  REQUEST_ADD_TAG,
  RECEIVE_LISTS,
  REQUEST_LISTS
} from '../actionTypes/todos'

function* addTodo(action) {
  try {
    const { data } = yield call(api.addTodo, action.todo)
    yield put({ type: RECEIVE_TODO, payload: data.payload });
  } catch (err) {
    yield put({ type: RECEIVE_ERROR, error: action.error });
  }
}

function* updateTodo(action) {
  const { payload } = action
  try {
    const { data } = yield call(api.updateTodo, payload.id, payload.todoUpdates)
    yield put({ type: UPDATE_TODO, payload: data.payload });
  } catch (err) {
    yield put({ type: RECEIVE_ERROR, error: action.error });
  }
}

function* fetchTodos(action) {
  try {
    const { data } = yield call(api.fetchTodos, action.payload)
    yield put({ type: RECEIVE_TODOS, payload: data.payload });
  } catch (err) {
    console.log(err)
    yield put({ type: RECEIVE_ERROR, error: err });
  }
}

function* fetchTodosByTags(action) {
  try {
    const { data } = yield call(api.fetchTodosByTags, action.payload)
    yield put({ type: RECEIVE_TODOS, payload: data.payload });
  } catch (err) {
    yield put({ type: RECEIVE_ERROR, error: err });
  }
}

function* fetchTodo(action) {
  try {
    const { data } = yield call(api.fetchTodo, action.id)
    yield put({ type: SET_ACTIVE_TODO, payload: data.payload });
  } catch (err) {
    console.log(err)
    yield put({ type: RECEIVE_ERROR, error: err });
  }
}

function* deleteTodo(action) {
  const { payload } = action
  try {
    const { data } = yield call(api.deleteTodo, payload.id)
    yield put({ type: REMOVE_TODO, payload: data.payload });
  } catch (err) {
    console.log(err)
    yield put({ type: RECEIVE_ERROR, error: err });
  }
}

function* toggleTodoCompleted(action) {
  const { payload } = action
  try {
    const { data } = yield call(api.toggleTodoCompleted, payload.id)
    yield put({ type: UPDATE_TODO, payload: data.payload });
  } catch (err) {
    console.log(err)
    yield put({ type: RECEIVE_ERROR, error: err });
  }
}

function* removeTagFromTodo(action) {
  const { payload } = action
  try {
    const { data } = yield call(api.removeTagFromTodo, payload.id, payload.tag)
    yield put({ type: REMOVE_TAG, payload: data.payload });
  } catch (err) {
    console.log(err)
    yield put({ type: RECEIVE_ERROR, error: err });
  }
}

function* requestAddTag(action) {
  const { payload } = action
  try {
    const { data } = yield call(api.requestAddTag, payload.id, payload.tag)
    yield put({ type: ADD_TAG, payload: data.payload });
  } catch (err) {
    console.log(err)
    yield put({ type: RECEIVE_ERROR, error: err });
  }
}

function* requestLists() {
  try {
    const { data } = yield call(api.requestLists)
    yield put({ type: RECEIVE_LISTS, payload: data.payload });
  } catch (err) {
    console.log(err)
    yield put({ type: RECEIVE_ERROR, error: err });
  }
}

function* todosSagaWatcher() {
  yield takeEvery(REQUEST_ADD_TODO, addTodo)
  yield takeEvery(REQUEST_FETCH_TODOS, fetchTodos)
  yield takeEvery(REQUEST_FETCH_TODOS_BY_TAGS, fetchTodosByTags)
  yield takeEvery(REQUEST_FETCH_TODO, fetchTodo)
  yield takeEvery(REQUEST_UPDATE_TODO, updateTodo)
  yield takeEvery(REQUEST_DELETE_TODO, deleteTodo)
  yield takeEvery(REQUEST_TOGGLE_TODO_COMPLETED, toggleTodoCompleted)
  yield takeEvery(REQUEST_REMOVE_TAG, removeTagFromTodo)
  yield takeEvery(REQUEST_ADD_TAG, requestAddTag)
  yield takeEvery(REQUEST_LISTS, requestLists)
}

export default todosSagaWatcher;
