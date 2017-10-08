import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchCategoriesIfNeeded, selectCategory } from '../actions/categories'
import { sortByPopular, sortByLatest } from '../actions/sorting'

class NavigationBar extends Component {
  componentDidMount() {
    this.props.setCategory({name: this.props.match.params.cat || null})
  }
  render() {
    let currentCategory = this.props.match.params.cat || this.props.selectedCategory || null
    const { sortValue } = this.props
    return (
      <div className="navigation-bar">
        <nav>
          <ul>
            <li>
              <Link
                to="/"
                className={currentCategory == null ? 'selected' : ''}
                onClick={() => this.props.setCategory({name:null})}>
                all
              </Link>
            </li>
            {this.props.categories.map((category) => {
              return (
                <li key={category.name}>
                  <Link
                    to={`/category/${category.path}`}
                    className={currentCategory === category.name ? 'selected' : ''}
                    onClick={() => this.props.setCategory(category)}>
                    {category.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="nav-actions">
          <Link className="btn" to="/post">Add Post</Link>
          <div className="sort">
            <button className={sortValue === "popular" ? 'selected' : ''} onClick={() => this.props.sortPopular()}>Popular</button> &nbsp;
            <button className={sortValue === "latest" ? 'selected' : ''} onClick={() => this.props.sortLatest()}>Latest</button></div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    categories: state.categories.cats,
    isFetchingCategories: state.categories.isFetching,
    selectedCategory: state.categories.selectedCategory,
    sortValue: state.posts.sortValue
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCategories: () => dispatch(fetchCategoriesIfNeeded()),
    setCategory: (category) => dispatch(selectCategory(category)),
    sortPopular: () => dispatch(sortByPopular()),
    sortLatest: () => dispatch(sortByLatest())
  }
}


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBar));
