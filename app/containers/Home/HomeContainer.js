import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Home } from 'components'
import { connect } from 'react-redux'
import { redirectBasedOnAuth } from 'helpers/auth'

class HomeContainer extends Component {
  static propTypes = {
    isAuthed: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }
  componentWillMount () {
    redirectBasedOnAuth(this.props)
  }
  render () {
    return <Home />
  }
}

export default connect(({ users }) => ({
  isAuthed: users.isAuthed,
  isFetching: users.isFetching,
}))(HomeContainer)
