import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route } from 'react-router-dom'
import '../App.css';
import NewPost from './NewPost'
import PostList from './PostList'
import PostDetail from './PostDetail'
import NavigationBar from './NavigationBar'
import { fetchCategoriesIfNeeded } from '../actions/categories'
import { fetchPostsIfNeeded } from '../actions/posts'
import Notifications from 'react-notify-toast'

class App extends Component {
  componentDidMount() {
    this.props.getCategories()
    this.props.getAllPosts()
  }
  render() {
    return (
      <div className="App">
        <Notifications options={{ colors: { success: { color: '#fff', backgroundColor: 'green' }}}}/>
        <header>
          <h2>Readable</h2>
        </header>
        <main>
          <Route exact path="/" render={() => (
            <div>
              <NavigationBar categories={this.props.categories}/>
              <PostList posts={this.props.posts}/>
            </div>
          )}/>
          <Route path="/category/:cat" render={() => (
            <div>
              <NavigationBar categories={this.props.categories}/>
              <PostList posts={this.props.posts}/>
            </div>
          )}/>
          <Route exact path="/post" render={() => (
            <NewPost />
          )}/>
          <Route exact path="/post/:id" render={(props) => (
            <PostDetail postId={props.id}/>
          )}/>
        </main>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    categories: state.categories.cats,
    isFetchingCategories: state.categories.isFetching,
    posts: state.posts.allPosts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCategories: () => dispatch(fetchCategoriesIfNeeded()),
    getAllPosts: () => dispatch(fetchPostsIfNeeded())
  }
}


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
