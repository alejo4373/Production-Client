import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_ADD_LIST, REQUEST_LISTS } from '../store/actionTypes/lists';

export const useListsState = () => {
  const { lists } = useSelector(rootState => rootState.lists)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: REQUEST_LISTS })
  }, [dispatch])

  return { lists }
}

export const useRequestAddList = () => {
  const dispatch = useDispatch()
  return (name) => {
    dispatch({ type: REQUEST_ADD_LIST, payload: { name } })
  }
}
