import React from 'react';
import { Field, reduxForm } from 'redux-form';

let CommentForm = function({handleSubmit}) {
  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <h4>Add a comment</h4>
      <div>
        <label htmlFor="author">Name</label>
        <Field name="author" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="body">Comment</label>
        <Field name="body" component="textarea" type="text" />
      </div>
      <button type="submit">Add Comment</button>
    </form>
  )
}

CommentForm = reduxForm({
  form: 'comment'
})(CommentForm);

export default CommentForm;
