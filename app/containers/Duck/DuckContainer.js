import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Duck } from 'components'
import * as usersLikesActions from 'reduxConfig/modules/usersLikes'

const { func, object, bool, number } = PropTypes

class DuckContainer extends Component {
  static propTypes = {
    duck: object.isRequired,
    numberOfLikes: number,
    isLiked: bool.isRequired,
    hideLikeCount: bool.isRequired,
    hideReplyBtn: bool.isRequired,
    handleDeleteLike: func.isRequired,
    addAndHandleLike: func.isRequired,
  }
  static contextTypes = {
    router: object.isRequired,
  }
  static defaultProps = {
    hideReplyBtn: false,
    hideLikeCount: true,
  }
  goToProfile (e) {
    e.stopPropagation()
    this.context.router.history.push('/' + this.props.duck.uid)
  }
  handleClick (e) {
    e.stopPropagation()
    this.context.router.history.push('/' + this.props.duck.duckId)
  }
  render () {
    return (
      <Duck
        goToProfile={this.goToProfile}
        onClick={this.props.hideReplyBtn === true ? null : this.handleClick}
        {...this.props}/>
    )
  }
}

function mapStateToProps ({ ducks, likeCount, usersLikes }, props) {
  return {
    duck: ducks[props.duckId],
    hideLikeCount: props.hideLikeCount,
    hideReplyBtn: props.hideReplyBtn,
    isLiked: usersLikes[props.duckId] === true,
    numberOfLikes: likeCount[props.duckId],
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(usersLikesActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DuckContainer)
