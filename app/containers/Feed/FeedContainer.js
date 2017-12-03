import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Feed } from 'components'
import { redirectBasedOnAuth } from 'helpers/auth'
import * as feedActionCreators from 'reduxConfig/modules/feed'

class FeedContainer extends Component {
  static propTypes = {
    isAuthed: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    newDucksAvailable: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    isFeedFetching: PropTypes.bool.isRequired,
    setAndHandleFeedListener: PropTypes.func.isRequired,
    resetNewDucksAvailable: PropTypes.func.isRequired,
  }
  componentWillMount () {
    redirectBasedOnAuth(this.props)
  }
  componentDidMount () {
    this.props.setAndHandleFeedListener()
  }
  render () {
    return (
      <Feed
        newDucksAvailable={this.props.newDucksAvailable}
        error={this.props.error}
        isFeedFetching={this.props.isFeedFetching}
        resetNewDucksAvailable={this.props.resetNewDucksAvailable}/>
    )
  }
}

function mapStateToProps ({ feed, users }) {
  const { newDucksAvailable, error, isFeedFetching } = feed
  const { isAuthed, isFetching } = users
  return {
    newDucksAvailable,
    error,
    isFeedFetching,
    isAuthed,
    isFetching,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(feedActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer)
