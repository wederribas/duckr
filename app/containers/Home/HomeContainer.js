import React, { Component } from 'react'
import { Home } from 'components'
import { connect } from 'react-redux'
import { redirectBasedOnAuth } from 'helpers/auth'

class HomeContainer extends Component {
  componentWillMount () {
    redirectBasedOnAuth(this.props)
  }
  render () {
    return <Home />
  }
}

export default connect(state => ({ isAuthed: state.isAuthed }))(HomeContainer)
