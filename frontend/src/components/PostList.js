import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import sortBy from 'sort-by';
import { votePost } from '../actions/posts'
import PostListItem from './PostListItem'

class PostList extends Component {
  filterPosts(posts) {
    if (this.props.selectedCategory) {
      return (
        posts
        .filter( post => post.deleted === false )
        .filter( post => post.category === this.props.selectedCategory )
      )
    } else {
      return (
        posts
        .filter( post => post.deleted === false )
      )
    }
  }

  sortPosts(posts, sortValue) {
    if(sortValue === "latest") {
      return posts.sort(sortBy('-timestamp'))
    } else {
      return posts.sort(sortBy('-voteScore'))
    }
  }

  showPosts() {
    const { posts } = this.props
    let filteredPosts;
    if (posts) {
      filteredPosts = this.filterPosts(posts)
      filteredPosts = this.sortPosts(filteredPosts, this.props.sortValue)
      if (filteredPosts && filteredPosts.length !== 0) {
        return (
          filteredPosts && filteredPosts
          .map((post) => {
            return (
              <PostListItem key={post.id} post={post}/>
            )
          })
        )
      } else {
         return (
           <div className="post-row">
             <div className="list-empty">No posts to show. <Link to="/post">Add a Post.</Link></div>
           </div>
         )
       }
    }
  }

  render() {
    return (
      <div className="post-list">
        <div className="page-content">
          <ul className="post-list">
            {this.showPosts()}
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    selectedCategory: state.categories.selectedCategory,
    isFetchingAllPosts: state.posts.isFetching,
    sortValue: state.posts.sortValue
  }
}

function mapDispatchToProps (dispatch) {
  return {
    vote: (postId, vote) => dispatch(votePost(postId, vote))
  }
}


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList));
