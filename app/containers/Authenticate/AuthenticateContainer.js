import React, { Component } from 'react'
import { Authenticate } from 'components'
import auth from 'helpers/auth'

export default class AuthenticateContainer extends Component {
  handleAuth () {
    auth().then(user => {
      console.log('Authed User', user)
    })
  }
  render () {
    return <Authenticate isFetching={false} error='' onAuth={this.handleAuth} />
  }
}
