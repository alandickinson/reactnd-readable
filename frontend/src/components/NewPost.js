import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PostForm from './PostForm';
import { addPost } from '../actions/posts';
import { reset, hasSubmitSucceeded } from 'redux-form';

class NewPost extends Component {
  submit = (post) => {
   this.props.submitPost(post, this.props.history)
   this.props.resetPostForm()
  }
  render() {
    return (
      <div>
        <PostForm onSubmit={this.submit}/>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    submitSucceeded: hasSubmitSucceeded('form')(state)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    submitPost: (post, history) => dispatch(addPost(post, history)),
    resetPostForm: () => dispatch(reset('post'))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPost));
