import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { List } from 'immutable'
import { Feed } from 'components'
import { redirectBasedOnAuth } from 'helpers/auth'
import * as feedActionCreators from 'reduxConfig/modules/feed'

class FeedContainer extends Component {
  static propTypes = {
    duckIds: PropTypes.instanceOf(List),
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
        resetNewDucksAvailable={this.props.resetNewDucksAvailable}
        duckIds={this.props.duckIds}/>
    )
  }
}

function mapStateToProps ({ feed, users }) {
  const { isAuthed, isFetching } = users
  return {
    newDucksAvailable: feed.get('newDucksAvailable'),
    error: feed.get('error'),
    isFeedFetching: feed.get('isFeedFetching'),
    duckIds: feed.get('duckIds'),
    isAuthed,
    isFetching,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(feedActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer)
