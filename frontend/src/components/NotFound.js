import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NotFound extends Component {
  render() {
    return (
      <div>
        <Link className="back-link" to="/">Back To All Posts</Link>
        <h4>A post with that id wasn't found.</h4>
      </div>
    )
  }
}

export default NotFound
