import {
  REQUEST_COMMENTS,
  RECEIVE_COMMENTS,
  DELETE_COMMENT,
  VOTE_COMMENT,
  ADD_COMMENT,
  UPDATE_COMMENT,
  GET_COMMENT_COUNT
} from '../actions/comments'

const initialCommentState = {
  commentCounts: []
}

function comments(state = initialCommentState, action) {
  const { type, payload } = action
  switch (type) {
    case REQUEST_COMMENTS:
      return {
        ...state
      }
    case RECEIVE_COMMENTS:
      return {
        ...state,
        comments: payload,
      }
    case DELETE_COMMENT:
    case VOTE_COMMENT:
      return {
        ...state,
        comments: state.comments.map(comment => {
          if(comment.id === payload.id) {
            return payload
          } else {
            return comment
          }
        })
      }
    case GET_COMMENT_COUNT:
      return {
        ...state,
        commentCounts: state.commentCounts.concat(payload)
      }
    case ADD_COMMENT:
      return {
        ...state,
        comments: state.comments.concat(payload)
      }
    case UPDATE_COMMENT:
      return {
        ...state,
        comments: state.comments.map(comment => {
          if(comment.id === payload.id) {
            return payload
          } else {
            return comment
          }
        })
      }
    default:
      return state
  }
}

export default comments
