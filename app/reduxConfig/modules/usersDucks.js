const FETCHING_USERS_DUCKS = 'FETCHING_USERS_DUCKS'
const FETCHING_USERS_DUCKS_ERROR = 'FETCHING_USERS_DUCKS_ERROR'
const FETCHING_USERS_DUCKS_SUCCESS = 'FETCHING_USERS_DUCKS_SUCCESS'
const ADD_SINGLE_USERS_DUCK = 'ADD_SINGLE_USERS_DUCK'

function fetchingUsersDucks () {
  return {
    type: FETCHING_USERS_DUCKS,
  }
}

function fetchingUsersDucksError (error) {
  return {
    type: FETCHING_USERS_DUCKS_ERROR,
    error: 'Error fetching Users Ducks Ids',
  }
}

function fetchingUsersDucksSuccess (uid, duckIds, lastUpdated) {
  return {
    type: FETCHING_USERS_DUCKS_SUCCESS,
    uid,
    duckIds,
    lastUpdated,
  }
}

export function addSingleUsersDuck (uid, duckIds, lastUpdated) {
  return {
    type: ADD_SINGLE_USERS_DUCK,
    uid,
    duckIds,
    lastUpdated,
  }
}

function usersDuck (state = initialState, action) {
  switch (action.type) {
    case ADD_SINGLE_USERS_DUCK:
      return {
        ...state,
        duckIds: state.duckIds.concat([action.duckId]),
      }
    default:
      return state
  }
}

const initialState = {
  isFetching: false,
  error: '',
}

export default function usersDucks (state = initialState, action) {
  switch (action.type) {
    case FETCHING_USERS_DUCKS:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_USERS_DUCKS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case FETCHING_USERS_DUCKS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.uid]: {
          lastUpdated: action.lastUpdated,
          duckIds: action.duckIds,
        },
      }
    case ADD_SINGLE_USERS_DUCK:
      return typeof state[action.uid] === 'undefined'
        ? state
        : {
          ...state,
          isFetching: false,
          error: '',
          [action.uid]: usersDuck(state[action.uid], action),
        }
    default:
      return state
  }
}
