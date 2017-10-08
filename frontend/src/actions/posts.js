import * as uuid from 'uuid'
import * as API from '../utils/api'
import { notify } from 'react-notify-toast'

export const ADD_POST = 'ADD_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const VOTE_POST = 'VOTE_POST'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const REQUEST_SINGLE_POST = 'REQUEST_SINGLE_POST'
export const RECEIVE_SINGLE_POST = 'RECEIVE_SINGLE_POST'

/***************
Posts
***************/
export function addPost (post, history) {
  const newPost = {
    id: uuid(),
    timestamp: Date.now(),
    title: post.title,
    body: post.body,
    author: post.author,
    category: post.category
  }
  return dispatch => {
    API.addPost(newPost)
    .then((json) => {
      dispatch({type: ADD_POST, payload: json});
      history.push(`/post/${json.id}`)
      notify.show('Post added.', "success");
    })
  }
}

export function votePost(postId, vote) {
  return dispatch => {
    API.votePost(postId, vote)
    .then((json) => dispatch({type: VOTE_POST, payload: json}))
  }
}

export function updatePost (post, postId) {
  console.log("Here's the id of the post I'm editing: ", postId)
  const updatedPost = {
    id: postId,
    timestamp: Date.now(),
    title: post.title,
    body: post.body,
    author: post.author,
    category: post.category
  }
  return dispatch => {
    API.updatePost(updatedPost)
    .then((json) => {
      dispatch({type: UPDATE_POST, payload: json});
      notify.show('Post updated.', "success");
    })
  }
}

export function deletePost(postId, history) {
  return dispatch => {
    API.deletePost(postId)
    .then((json) => {
      dispatch({type: DELETE_POST, payload: json})
      history.push(`/`)
      notify.show('Post deleted.', 'success', 3000);
    })
  }
}

function requestPosts(category) {
  return {
    type: REQUEST_POSTS,
    category
  }
}

function receivePosts(category, json) {
  return {
    type: RECEIVE_POSTS,
    category,
    posts: json.map((post) => post),
    receivedAt: Date.now()
  }
}

function requestSinglePost(postId) {
  return {
    type: REQUEST_SINGLE_POST,
    postId
  }
}

function receiveSinglePost(json) {
  return {
    type: RECEIVE_SINGLE_POST,
    post: json
  }
}

export function fetchPosts(category) {
  return dispatch => {
    dispatch(requestPosts(category))
    API.getPosts(category)
    .then((json) => dispatch(receivePosts(category, json)))
  }
}

function shouldFetchPosts(state, category) {
  let posts
  if(category) {
    posts = state.posts.postsByCategory[category]
  } else {
    posts = state.posts.postsByCategory
  }
  if (!posts) {
    return true
  } else if (state.posts.isFetching) {
    return false
  } else {
    return state.posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(category) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), category)) {
      return dispatch(fetchPosts(category))
    } else {
      return Promise.resolve()
    }
  }
}

export function fetchSinglePost(postId) {
  return dispatch => {
    dispatch(requestSinglePost(postId))
    API.getPost(postId)
    .then((json) => dispatch(receiveSinglePost(json)))
  }
}
