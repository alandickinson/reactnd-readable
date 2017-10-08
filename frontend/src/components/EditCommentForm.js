import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class EditCommentForm extends Component {
  componentWillMount() {
    const comment = this.props.comment
    this.props.initialize({
      author: comment.author,
      body: comment.body,
      id: comment.id
    })
  }
  render() {
    const { handleSubmit, cancelFunc } = this.props
    return (
      <form className="edit-comment-form" onSubmit={ handleSubmit }>
        <h4>Update comment</h4>
        <div>
          <label htmlFor="author">Name</label>
          <Field name="author" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="body">Comment</label>
          <Field name="body" component="textarea" type="text" />
        </div>
        <div>
          <Field name="id" component="input" type="hidden" />
        </div>
        <div className="form-controls">
          <button className="submit" type="submit">Update Comment</button>
          <div className="edit-post-meta meta">
            <button onClick={() => cancelFunc()}>Cancel</button>
          </div>
        </div>
      </form>
    )
  }
}

EditCommentForm = reduxForm({
  form: 'editcomment'
})(EditCommentForm);

export default EditCommentForm;
