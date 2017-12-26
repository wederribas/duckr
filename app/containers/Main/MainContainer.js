import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Navigation } from 'components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { container, innerContainer } from './styles.css'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'reduxConfig/modules/users'
import * as usersLikesActionCreators from 'reduxConfig/modules/usersLikes'
import { formatUserInfo } from 'helpers/utils'
import { firebaseAuth } from 'config/constants'

class MainContainer extends Component {
  static propTypes = {
    isAuthed: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    authUser: PropTypes.func.isRequired,
    fetchingUserSuccess: PropTypes.func.isRequired,
    removeFetchingUser: PropTypes.func.isRequired,
    setUsersLikes: PropTypes.func.isRequired,
  }
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }
  componentDidMount () {
    firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        const userData = user.providerData[0]
        const userInfo = formatUserInfo(
          userData.displayName,
          userData.photoURL,
          user.uid
        )
        this.props.authUser(user.uid)
        this.props.fetchingUserSuccess(user.uid, userInfo, Date.now())
        this.props.setUsersLikes()
        if (this.props.location.pathname === '/') {
          this.context.router.history.replace('feed')
        }
      } else {
        this.props.removeFetchingUser()
      }
    })
  }
  render () {
    return this.props.isFetching === true ? null : (
      <div className={container}>
        <Navigation isAuthed={this.props.isAuthed} />
        <div className={innerContainer}>{this.props.children}</div>
      </div>
    )
  }
}

export default withRouter(
  connect(
    ({ users }) => ({
      isAuthed: users.isAuthed,
      isFetching: users.isFetching,
    }),
    dispatch =>
      bindActionCreators(
        {
          ...userActionCreators,
          ...usersLikesActionCreators,
        },
        dispatch
      )
  )(MainContainer)
)
