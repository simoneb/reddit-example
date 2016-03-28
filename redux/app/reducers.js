import { combineReducers } from 'redux'

import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  RECEIVE_POSTS, REQUEST_POSTS
} from './actions'

function selectedSubreddit (state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.payload
    default:
      return state
  }
}

function posts (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return { ...state, didInvalidate: true }
    case REQUEST_POSTS:
      return { ...state, isFetching: true, didInvalidate: false }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.payload.json.data.children.map(c => c.data),
        lastUpdated: new Date()
      }
    default:
      return state
  }
}

function postsBySubreddit (state = {}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state,
        [action.payload.subreddit]: posts(state[action.payload.subreddit], action)
      }
    default:
      return state
  }
}

export default combineReducers({
  postsBySubreddit,
  selectedSubreddit
})