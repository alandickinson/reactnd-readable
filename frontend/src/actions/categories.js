import * as API from '../utils/api'

export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

/***************
Categories
***************/
export function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    category
  }
}

function requestCategories() {
  return {
    type: REQUEST_CATEGORIES
  }
}

function receiveCategories(json) {
  return {
    type: RECEIVE_CATEGORIES,
    categories: json.categories.map((category) => category),
    receivedAt: Date.now()
  }
}

export function fetchCategories() {
  return dispatch => {
    dispatch(requestCategories())
    API.getCategories()
    .then((json) => dispatch(receiveCategories(json)))
  }
}

function shouldFetchCategories(state) {
  const cats = state.categories
  if (cats.lastUpdated == null) {
    return true
  } else if (cats.isFetching) {
    return false
  } else {
    return false
  }
}

export function fetchCategoriesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchCategories(getState())) {
      return dispatch(fetchCategories())
    } else {
      return Promise.resolve()
    }
  }
}
