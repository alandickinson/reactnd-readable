import * as uuid from 'uuid'
import * as API from '../utils/api'
import { notify } from 'react-notify-toast'

export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const GET_COMMENT_COUNT = 'GET_COMMENT_COUNT'

/***************
Comments
***************/
export function addComment (postId, comment) {
  const newComment = {
    id: uuid(),
    timestamp: Date.now(),
    body: comment.body,
    author: comment.author,
    parentId: postId
  }
  return dispatch => {
    API.addComment(newComment)
    .then((json) => dispatch({type: ADD_COMMENT, payload: json}))
  }
}

export function updateComment (comment) {
  const updatedComment = {
    id: comment.id,
    timestamp: Date.now(),
    body: comment.body,
    author: comment.author
  }
  return dispatch => {
    API.updateComment(updatedComment)
    .then((json) => {
      dispatch({type: UPDATE_COMMENT, payload: json});
      notify.show('Comment updated.', "success");
    })
  }
}

export function getCommentCount (postId) {
  return dispatch => {
    API.getCommentCount(postId)
    .then((res) => {
      const comments = res.filter((comment) => !comment.deleted);
      const length = comments.length
      const count = {
        id: postId,
        comments: length
      };
      dispatch({type: GET_COMMENT_COUNT, payload: count});
    })
  }
}

function requestComments(postId) {
  return {
    type: REQUEST_COMMENTS,
    postId
  }
}

function receiveComments(json) {
  return {
    type: RECEIVE_COMMENTS,
    payload: json.map((comment) => comment)
  }
}

export function deleteComment(commentId) {
  return dispatch => {
    API.deleteComment(commentId)
    .then((json) => dispatch({type: DELETE_COMMENT, payload: json}))
  }
}

export function fetchComments(postId) {
  return dispatch => {
    dispatch(requestComments(postId))
    API.getComments(postId)
    .then((json) => dispatch(receiveComments(json)))
  }
}

export function voteComment(commentId, vote) {
  return dispatch => {
    API.voteComment(commentId, vote)
    .then((json) => dispatch({type: VOTE_COMMENT, payload: json}))
  }
}
