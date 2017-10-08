import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class EditPostForm extends Component {
  componentWillMount() {
    const { post } = this.props
    this.props.initialize({
      author: post.author,
      title: post.title,
      body: post.body,
      category: post.category
    });
  }
  render() {
    const { handleSubmit, cancelFunc } = this.props
    return (
      <form className="edit-post-form" onSubmit={ handleSubmit }>
        <h4>Update Post</h4>
        <div>
          <label htmlFor="author">Author</label>
          <Field name="author" component="input" type="text"/>
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
          <Field name="title" component="input" type="text"/>
        </div>
        <div>
          <label htmlFor="body">Post body</label>
          <Field name="body" component="textarea" rows="10" type="text"/>
        </div>
        <div className="form-controls">
          <button className="submit" type="submit">Update Post</button>
          <div className="edit-post-meta meta">
            <button onClick={() => cancelFunc()}>Cancel</button>
          </div>
        </div>
      </form>
    )
  }
}

EditPostForm = reduxForm({
  form: 'editpost'
})(EditPostForm)
export default EditPostForm;
