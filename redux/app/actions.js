import fetch from 'isomorphic-fetch'
import { createAction, handleAction, handleActions } from 'redux-actions'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export const selectSubreddit = createAction(SELECT_SUBREDDIT)
export const invalidateSubreddit = createAction(INVALIDATE_SUBREDDIT)
export const requestPosts = createAction(REQUEST_POSTS)
export const receivePosts = createAction(RECEIVE_POSTS)

function fetchPosts (subreddit) {
  return dispatch => {
    dispatch(requestPosts({ subreddit }))
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(req => req.json())
      .then(json => dispatch(receivePosts({ subreddit, json })))
  }
}

function shouldFetchPosts (state, subreddit) {
  const posts = state.postsBySubreddit[subreddit] || []

  if (!posts.length) return true
  else if (posts.isFetching) return false
  else return posts.didInvalidate
}

export function fetchPostsIfNeeded (subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit))
    }
  }
}