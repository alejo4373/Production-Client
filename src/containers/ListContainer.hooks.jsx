import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_LISTS } from '../store/actionTypes/lists';

export const useListsState = () => {
  const { lists } = useSelector(rootState => rootState.lists)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: REQUEST_LISTS })
  }, [dispatch])

  return { lists }
}
