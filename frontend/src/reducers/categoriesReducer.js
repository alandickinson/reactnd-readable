import {
  SELECT_CATEGORY,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES
} from '../actions/categories'

const initialCategoryState = {
  cats: [],
  isFetching: false,
  lastUpdated: null,
  selectedCategory: null
}

function categories (state = initialCategoryState, action) {
  switch (action.type) {
    case REQUEST_CATEGORIES:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_CATEGORIES:
      let receivedCats = action.categories.map((cat) => {
        return { name: cat.name, path: cat.path }
      })
      return {
        ...state,
        cats: receivedCats,
        isFetching: false,
        lastUpdated: action.receivedAt
      }
    case SELECT_CATEGORY:
      let cat = action.category.name ? action.category.name : null
      return {
        ...state,
        selectedCategory: cat
      }
    default:
      return state
  }
}

export default categories
