import { combineReducers } from 'redux'
import categories from './categoriesReducer'
import posts from './postsReducer'
import comments from './commentsReducer'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  categories,
  posts,
  comments,
  form: formReducer
})
