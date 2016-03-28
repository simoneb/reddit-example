import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit
} from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

class AsyncApp extends Component {
  componentDidMount () {
    this.props.fetchPostsIfNeeded(this.props.selectedSubreddit)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
      nextProps.fetchPostsIfNeeded(nextProps.selectedSubreddit)
    }
  }

  handleChange = nextSubreddit => this.props.selectSubreddit(nextSubreddit)

  handleRefreshClick = e => {
    e.preventDefault()

    const { selectedSubreddit } = this.props

    this.props.invalidateSubreddit(selectedSubreddit)
    this.props.fetchPostsIfNeeded(selectedSubreddit)
  }

  render () {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props

    return (
      <div>
        <Picker value={selectedSubreddit}
                onChange={this.handleChange}
                options={['reactjs', 'frontend']}/>
        <p>
          {lastUpdated &&
          <span>
            Last updated at {new Date(lastUpdated).toLocaleTimeString()}
          </span>
          }
          {!isFetching &&
          <a href="#"
             onClick={this.handleRefreshClick}>
            Refresh
          </a>
          }
        </p>
        {isFetching && !posts.length && <h2>Loading...</h2>}
        {!isFetching && !posts.length && <h2>Empty</h2>}
        {posts.length &&
        <div style={{ opacity: isFetching ? .5 : 1 }}>
          <Posts posts={posts}/>
        </div>
        }
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { selectedSubreddit, postsBySubreddit } = state

  const { isFetching, lastUpdated, items: posts } =
    postsBySubreddit[selectedSubreddit] || { isFetching: true, items: [] }

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectSubreddit: subreddit => dispatch(selectSubreddit(subreddit)),
    fetchPostsIfNeeded: subreddit => dispatch(fetchPostsIfNeeded(subreddit)),
    invalidateSubreddit: subreddit => dispatch(invalidateSubreddit({ subreddit }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsyncApp)