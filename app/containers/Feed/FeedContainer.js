import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Feed } from 'components'
import { redirectBasedOnAuth } from 'helpers/auth'

class FeedContainer extends Component {
  static propTypes = {
    isAuthed: PropTypes.bool.isRequired,
  }
  componentWillMount () {
    redirectBasedOnAuth(this.props)
  }
  render () {
    return <Feed />
  }
}

export default connect(state => ({ isAuthed: state.isAuthed }))(FeedContainer)
