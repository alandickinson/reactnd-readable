import {
  UPDATE_POST,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  REQUEST_SINGLE_POST,
  RECEIVE_SINGLE_POST,
  VOTE_POST,
  ADD_POST,
  DELETE_POST
} from '../actions/posts'
import {
  SORT_BY_LATEST,
  SORT_BY_POPULAR
} from '../actions/sorting'

const initialPostState = {
  allPosts: [],
  isFetching: false,
  lastUpdated: null,
  singlepost: [],
  sortValue: "popular"
}

function posts (state = initialPostState, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        allPosts: state.allPosts.concat(action.payload)
      }
    case UPDATE_POST:
      return {
        ...state,
        allPosts: state.allPosts.concat(action.payload),
        singlepost: (state.singlepost.id === action.payload.id) ? action.payload : state.singlepost
      }
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        allPosts: action.posts,
        lastUpdated: action.receivedAt
      }
    case REQUEST_SINGLE_POST:
      return {
        ...state,
        singlepost: {
          isFetching: true
        }
      }
    case RECEIVE_SINGLE_POST:
      return {
        ...state,
        singlepost: {
          ...action.post,
          isFetching: false
        }
      }
    case SORT_BY_POPULAR:
      return {
        ...state,
        sortValue: "popular"
      }
    case SORT_BY_LATEST:
      return {
        ...state,
        sortValue: "latest"
      }
    case DELETE_POST:
    case VOTE_POST:
      return {
        ...state,
        allPosts: state.allPosts.map(post => {
          if(post.id === action.payload.id) {
            return action.payload
          } else {
            return post
          }
        }),
        singlepost: (state.singlepost.id === action.payload.id) ? action.payload : state.singlepost
      }
    default:
      return state
  }
}

export default posts
