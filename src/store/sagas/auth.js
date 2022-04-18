import * as api from '../../api'
import {
  RECEIVE_AUTH_ERROR,
  RECEIVE_AUTH_SUCCESS,
  REQUEST_AUTH_LOGIN,
  REQUEST_AUTH_LOGOUT,
  REQUEST_AUTH_SIGNUP,
  REQUEST_AUTH_STATUS,
  SET_AUTH_LOADING
} from '../actionTypes/auth'
import { RESET_STATE } from '../actionTypes/comm'
import { call, put, takeEvery } from 'redux-saga/effects'

function* loginUser(action) {
  try {
    const { data } = yield call(api.login, action.payload.credentials)
    yield put({
      type: RECEIVE_AUTH_SUCCESS,
      payload: { username: data.payload.user.username }
    })
  } catch (err) {
    let errMessage = 'Unknown error'
    if (err.response.data.error) {
      errMessage = err.response.data.message
    }
    yield put({ type: RECEIVE_AUTH_ERROR, error: errMessage })
  }
}

function* signupUser(action) {
  try {
    const { data } = yield call(api.signup, action.payload.userInfo)
    yield put({
      type: RECEIVE_AUTH_SUCCESS,
      payload: { username: data.payload.user.username }
    })
  } catch (err) {
    let errMessage = 'Unknown error'
    const { data } = err.response
    if (data.error) {
      errMessage = data.message
    }
    yield put({ type: RECEIVE_AUTH_ERROR, error: errMessage })
  }
}

function* logoutUser(action) {
  try {
    yield call(api.logout)
    yield put({ type: RESET_STATE })
  } catch (err) {
    let errMessage = 'Unknown error'
    const { data } = err.response
    if (data.error) {
      errMessage = data.message
    }
    yield put({ type: RECEIVE_AUTH_ERROR, error: errMessage })
  }
}

function* checkAuthStatus() {
  try {
    yield put({ type: SET_AUTH_LOADING })
    const { data } = yield call(api.getUser)
    yield put({
      type: RECEIVE_AUTH_SUCCESS,
      payload: { username: data.payload.user.username }
    })
  } catch (err) {
    let errMessage = 'Unknown error'
    const { data } = err.response
    if (data.error) {
      errMessage = data.message
    }
    yield put({ type: RECEIVE_AUTH_ERROR, error: errMessage })
  }
}

function* authSagaWatcher() {
  yield takeEvery(REQUEST_AUTH_LOGIN, loginUser)
  yield takeEvery(REQUEST_AUTH_SIGNUP, signupUser)
  yield takeEvery(REQUEST_AUTH_LOGOUT, logoutUser)
  yield takeEvery(REQUEST_AUTH_STATUS, checkAuthStatus)
}

export default authSagaWatcher
