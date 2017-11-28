import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Authenticate } from 'components'
import * as userActionCreators from 'reduxConfig/modules/users'
import { redirectBasedOnAuth } from 'helpers/auth'

class AuthenticateContainer extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    fetchAndHandleAuthedUser: PropTypes.func.isRequired,
  }
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }
  componentWillMount () {
    redirectBasedOnAuth(this.props)
  }
  handleAuth = e => {
    e.preventDefault()
    this.props
      .fetchAndHandleAuthedUser()
      .then(() => this.context.router.history.replace('feed'))
  }
  render () {
    return (
      <Authenticate
        isFetching={this.props.isFetching}
        error={this.props.error}
        onAuth={this.handleAuth}/>
    )
  }
}

function mapStateToProps ({ users }) {
  return {
    isAuthed: users.isAuthed,
    isFetching: users.isFetching,
    error: users.error,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(userActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AuthenticateContainer
)
