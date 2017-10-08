import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm, hasSubmitSucceeded } from 'redux-form';
import { addPost } from '../actions/posts'

class PostForm extends Component {
  render() {
    const { handleSubmit } = this.props
    return (
      <div>
        <Link className="back-link" to="/">Back To All Posts</Link>
        <form className="post-form" onSubmit={ handleSubmit }>
          <h4>Add a Post</h4>
          <div>
            <label htmlFor="author">Your name</label>
            <Field name="author" component="input" type="text" />
          </div>
          <div>
            <label>Category</label>
            <div>
              <Field name="category" component="select">
                <option />
                <option value="react">React</option>
                <option value="redux">Redux</option>
                <option value="udacity">Udacity</option>
              </Field>
            </div>
          </div>
          <div>
            <label htmlFor="title">Post title</label>
            <Field name="title" component="input" type="text" />
          </div>
          <div>
            <label htmlFor="body">Post body</label>
            <Field name="body" component="textarea" rows="10" type="text" />
          </div>
          <button type="submit">Add Post</button>
        </form>
      </div>
    )
  }
}

PostForm = reduxForm({
  form: 'post'
})(PostForm);

function mapStateToProps (state, ownProps) {
  return {
    submitSucceeded: hasSubmitSucceeded('post')(state)
  }
}
function mapDispatchToProps (dispatch) {
  return {
    submitPost: (post) => dispatch(addPost(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm);
