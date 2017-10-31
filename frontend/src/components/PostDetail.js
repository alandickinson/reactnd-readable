import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchSinglePost, votePost, deletePost, updatePost } from '../actions/posts';
import { fetchComments, addComment } from '../actions/comments'
import { reset } from 'redux-form';
import RelativeTime from 'react-relative-time';
import CommentsList from './CommentsList';
import CommentForm from './CommentForm';
import Modal from 'react-modal';
import EditPostForm from './EditPostForm';
import NotFound from './NotFound';

class PostDetail extends Component {
  state = {
    postModalOpen: false
  }
  openPostModal = () => {
    this.setState(() => ({
      postModalOpen: true
    }))
  }
  closePostModal = () => {
    this.setState(() => ({
      postModalOpen: false
    }))
  }
  componentWillMount() {
    const postId = this.props.match.params.id
    if(postId) {
      this.props.getPost(postId)
      this.props.getComments(postId)
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log("getting new props", this.props, nextProps)
  }
  submitComment = (comment) => {
    const postId = this.props.match.params.id
    if (comment.body && comment.author) {
       this.props.submitComment(postId, comment)
       this.props.resetCommentForm()
    }
  }
  submitPostUpdate = (post) => {
    const postId = this.props.match.params.id
    if (post.body && post.author) {
       this.props.editPost(post, postId)
       this.closePostModal()
    }
  }
  render() {
    const postModalOpen = this.state.postModalOpen
    const post = this.props.post
    return !post || post.id != this.props.urlParam || post.deleted === true
      ? <NotFound/>
      : <div className="post-detail">
          <Modal
            className='modal'
            overlayClassName='overlay'
            isOpen={postModalOpen}
            contentLabel='Modal'
          >
            <EditPostForm onSubmit={this.submitPostUpdate} post={post} cancelFunc={this.closePostModal}/>
          </Modal>
          <Link className="back-link" to="/">Back To All Posts</Link>
          <div className="post-detail-info">
            <h2>{post.title}</h2>
            <div className="meta">
              by {post.author} in {post.category}&nbsp;
              {post.timestamp && (
                <RelativeTime value={post.timestamp}/>
              )}.
              &nbsp;<button onClick={() => this.openPostModal()}>edit</button>
              &nbsp;<button onClick={() => this.props.removePost(post.id, this.props.history)}>delete</button>
            </div>
            <div className="post-content">{post.body}</div>
          </div>
          <div className="vote">
            <button onClick={() => this.props.vote(post.id, "upVote")}></button>
            <div className="score">{post.voteScore}</div>
            <button onClick={() => this.props.vote(post.id, "downVote")}></button>
          </div>
          <div className="post-comments">
            <h4>Comments</h4>
            <CommentsList comments={this.props.comments}/>
          </div>
          <CommentForm onSubmit={this.submitComment}/>
        </div>
  }
}

function mapStateToProps (state, ownProps) {
  return {
    post: state.posts.singlepost,
    comments: state.comments.comments,
    urlParam: ownProps.match.params.id
  }
}


function mapDispatchToProps (dispatch) {
  return {
    getPost: (postId) => dispatch(fetchSinglePost(postId)),
    getComments: (postId) => dispatch(fetchComments(postId)),
    vote: (postId, vote) => dispatch(votePost(postId, vote)),
    submitComment: (parentId, comment) => dispatch(addComment(parentId, comment)),
    resetCommentForm: () => dispatch(reset('comment')),
    removePost: (postId, history) => dispatch(deletePost(postId, history)),
    editPost: (post, postId) => dispatch(updatePost(post, postId))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail));
