const REQUEST_HEADERS = { 'Authorization': 'alans-auth-string' }
const API_URL = 'http://localhost:3001'


/***************
Posts
***************/
export function addPost (post) {
  return fetch(API_URL + '/posts', {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      ...REQUEST_HEADERS,
      'Content-Type': 'application/json'
    }
  })
  .then((res) => res.json())
}

export function updatePost (post) {
  return fetch(API_URL + `/posts/${post.id}`, {
    method: 'PUT',
    body: JSON.stringify(post),
    headers: {
      ...REQUEST_HEADERS,
      'Content-Type': 'application/json'
    }
  })
  .then((res) => res.json())
}

export function getPosts (category = '') {
  let endpoint
  if (category === '' || category === 'all') {
    endpoint = '/posts'
  } else {
    endpoint = `/${category}/posts`
  }
  return fetch(API_URL + endpoint, {
    method: 'GET',
    headers: { ...REQUEST_HEADERS }
  })
    .then((res) => res.json())
}

export function getPost (postId) {
  return fetch(API_URL + `/posts/${postId}`, {
    method: 'GET',
    headers: { ...REQUEST_HEADERS }
  })
    .then((res) => res.json())
}

export function votePost (postId, vote) {
  const body = {option: vote}
  return fetch(API_URL + `/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...REQUEST_HEADERS,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then((res) => res.json())
}

export function deletePost (postId) {
  return fetch(API_URL + `/posts/${postId}`, {
    method: 'DELETE',
    headers: { ...REQUEST_HEADERS }
  })
  .then((res) => res.json())
}

/***************
Comments
***************/
export function addComment (comment) {
  return fetch(API_URL + '/comments', {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      ...REQUEST_HEADERS,
      'Content-Type': 'application/json'
    }
  })
  .then((res) => res.json())
}

export function updateComment (comment) {
  return fetch(API_URL + `/comments/${comment.id}`, {
    method: 'PUT',
    body: JSON.stringify(comment),
    headers: {
      ...REQUEST_HEADERS,
      'Content-Type': 'application/json'
    }
  })
  .then((res) => res.json())
}

export function getComments (postId) {
  return fetch( API_URL + `/posts/${postId}/comments`, { headers: {...REQUEST_HEADERS} } )
  .then((res) => res.json())
}

export function getCommentCount (postId) {
  return fetch( API_URL + `/posts/${postId}/comments`, { headers: {...REQUEST_HEADERS} } )
  .then((res) => res.json())
}

export function deleteComment (commentId) {
  return fetch(API_URL + `/comments/${commentId}`, {
    method: 'DELETE',
    headers: { ...REQUEST_HEADERS }
  })
  .then((res) => res.json())
}

export function voteComment (commentId, vote) {
  const body = {option: vote}
  return fetch(API_URL + `/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...REQUEST_HEADERS,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then((res) => res.json())
}

/***************
Categories
***************/
export function getCategories () {
  return fetch( API_URL + '/categories', { headers: {...REQUEST_HEADERS} } )
  .then((res) => res.json())
}
