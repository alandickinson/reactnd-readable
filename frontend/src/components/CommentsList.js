import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RelativeTime from 'react-relative-time';
import { deleteComment, voteComment, updateComment } from '../actions/comments'
import sortBy from 'sort-by';
import Modal from 'react-modal';
import EditCommentForm from './EditCommentForm';


class CommentsList extends Component {
  state = {
    commentModalOpen: false,
    editing: {}
  }
  openCommentModal = (comment) => {
    this.setState(() => ({
      commentModalOpen: true,
      commentToEdit: {
        id: comment.id,
        author: comment.author,
        body: comment.body
      }
    }))
  }
  closeCommentModal = () => {
    this.setState(() => ({
      commentModalOpen: false,
      commentToEdit: {}
    }))
  }
  submitCommentUpdate = (comment) => {
    console.log("this is what we're updating:", comment)
    if (comment.body && comment.author) {
       this.props.editComment(comment)
       this.closeCommentModal()
    }
  }
  processComments(comments) {
    return (
      comments
      .filter( comment => comment.deleted === false )
      .sort( sortBy('-voteScore') )
    )
  }
  showComments() {
    const { comments } = this.props
    let processedComments;
    if (comments) {
      processedComments = this.processComments(comments)
      if (processedComments && processedComments.length !== 0) {
        return (
          processedComments && processedComments
          .map((comment) => {
            return (
              <li className="comment" key={comment.id}>
                <div className="comment-content">
                  <p>{comment.body}</p>
                  <div className="meta">
                    by {comment.author} <RelativeTime value={comment.timestamp}/>.
                    &nbsp;<button onClick={() => this.openCommentModal(comment)}>edit</button> &nbsp;<button onClick={ () => this.props.removeComment(comment.id) }>delete</button>
                  </div>
                </div>
                <div className="vote">
                  <button onClick={() => this.props.vote(comment.id, "upVote")}></button>
                  <div className="score">{comment.voteScore}</div>
                  <button onClick={() => this.props.vote(comment.id, "downVote")}></button>
                </div>
              </li>
            )
          })
        )

      } else {
         return (
           <div className="comment-row">
             <div className="list-empty comments-empty">No comments yet.</div>
           </div>
         )
       }
    }
  }
  render() {
    const { commentModalOpen, commentToEdit } = this.state
    return (
      <div className="comments">
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={commentModalOpen}
          contentLabel='Modal'
        >
          <EditCommentForm onSubmit={this.submitCommentUpdate} comment={commentToEdit} cancelFunc={this.closeCommentModal}/>
        </Modal>
        <ul className="comment-list">
          {this.showComments()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    isFetchingComments: state.comments.isFetching,
    comments: state.comments.comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    removeComment: (commentId) => dispatch(deleteComment(commentId)),
    vote: (commentId, vote) => dispatch(voteComment(commentId, vote)),
    editComment: (comment) => dispatch(updateComment(comment))
  }
}


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsList));
