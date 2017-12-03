import { addListener } from 'reduxConfig/modules/listeners'
import { listenToFeed } from 'helpers/api'
import { addMultipleDucks } from 'reduxConfig/modules/ducks'

const SETTING_FEED_LISTENER = 'SETTING_FEED_LISTENER'
const SETTING_FEED_LISTENER_ERROR = 'SETTING_FEED_LISTENER_ERROR'
const SETTING_FEED_LISTENER_SUCCESS = 'SETTING_FEED_LISTENER_SUCCESS'
const ADD_NEW_DUCK_ID_TO_FEED = 'ADD_NEW_DUCK_ID_TO_FEED'
const RESET_NEW_DUCKS_AVAILABLE = 'RESET_NEW_DUCKS_AVAILABLE'

function settingFeedListener () {
  return {
    type: SETTING_FEED_LISTENER,
  }
}

function settingFeedListenerError (error) {
  return {
    type: SETTING_FEED_LISTENER_ERROR,
    error: 'Error fetching feeds',
  }
}

function settingFeedListenerSuccess (duckIds) {
  return {
    type: SETTING_FEED_LISTENER_SUCCESS,
    duckIds,
  }
}

function addNewDuckIdToFeed (duckId) {
  return {
    type: ADD_NEW_DUCK_ID_TO_FEED,
    duckId,
  }
}

export function resetNewDucksAvailable () {
  return {
    type: RESET_NEW_DUCKS_AVAILABLE,
  }
}

export function setAndHandleFeedListener () {
  let initialFetch = true
  return function (dispatch, getState) {
    if (getState().listeners.feed === true) {
      return
    }
    dispatch(addListener('feed'))
    dispatch(settingFeedListener())
    listenToFeed(({ feed, sortedIds }) => {
      dispatch(addMultipleDucks(feed))
      initialFetch === true
        ? dispatch(settingFeedListenerSuccess(sortedIds))
        : dispatch(addNewDuckIdToFeed(sortedIds[0]))
    })
  }
}

const initialState = {
  isFeedFetching: false,
  newDucksAvailable: false,
  newDucksToAdd: [],
  error: '',
  duckIds: [],
}

export default function feed (state = initialState, action) {
  switch (action.type) {
    case SETTING_FEED_LISTENER:
      return {
        ...state,
        isFeedFetching: true,
      }
    case SETTING_FEED_LISTENER_ERROR:
      return {
        ...state,
        isFeedFetching: false,
        error: action.error,
      }
    case SETTING_FEED_LISTENER_SUCCESS:
      return {
        ...state,
        isFeedFetching: false,
        error: '',
        duckIds: action.duckIds,
        newDucksAvailable: false,
      }
    case ADD_NEW_DUCK_ID_TO_FEED:
      return {
        ...state,
        newDucksToAdd: [action.duckId, ...state.newDucksToAdd],
      }
    case RESET_NEW_DUCKS_AVAILABLE:
      return {
        ...state,
        duckIds: [...state.newDucksToAdd, ...state.duckIds],
        newDucksToAdd: [],
        newDucksAvailable: false,
      }
    default:
      return state
  }
}
