import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import RelativeTime from 'react-relative-time';
import { votePost, deletePost } from '../actions/posts'
import { getCommentCount } from '../actions/comments'

class PostListItem extends Component {
  state = {
    hovered: false
  }
  componentWillMount() {
    const postId = this.props.post.id
    this.props.countComments(postId)
  }
  render() {
    const { post, commentCounts } = this.props
    const count = commentCounts.reduce((commentCount, item) => {
      if (item.id === post.id) {
        commentCount = item.comments
      }
      return commentCount
    }, 0)
    return (
      <li
        className={ this.state.hovered ? 'post-item post-item-hovered' : 'post-item' }
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
        key={post.id}>
        <div className="post-row">
          <Link className="post-link" to={`/post/${post.id}`}>
            <div className="post-row-info">
              <div className="post-row-content">
                <p>{post.title}</p>
                <div className="meta">
                  by {post.author} in {post.category} <RelativeTime value={post.timestamp}/>.
                  &nbsp; <span className="comment-count">{count}</span>
                  &nbsp;&nbsp; <Link to={`/post/${post.id}/edit`}>edit</Link>
                  &nbsp; <button onClick={() => this.props.removePost(post.id, this.props.history)}>delete</button>
                </div>
              </div>
            </div>
          </Link>
          <div className="vote">
            <button onClick={() => this.props.vote(post.id, "upVote")}></button>
            <div className="score">{post.voteScore}</div>
            <button onClick={() => this.props.vote(post.id, "downVote")}></button>
          </div>
        </div>
      </li>
    )
  }
}

function mapStateToProps (state) {
  return {
    commentCounts: state.comments.commentCounts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    vote: (postId, vote) => dispatch(votePost(postId, vote)),
    countComments: (postId) => dispatch(getCommentCount(postId)),
    removePost: (postId, history) => dispatch(deletePost(postId, history))
  }
}


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostListItem));
