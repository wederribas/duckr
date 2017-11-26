import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import getRoutes from 'config/routes'
import users from 'reduxConfig/modules/users'

const store = createStore(users, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>{getRoutes()}</Provider>,
  document.getElementById('app')
)
