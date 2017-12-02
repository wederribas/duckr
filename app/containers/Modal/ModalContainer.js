import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Modal } from 'components'
import * as modalActionsCreators from 'reduxConfig/modules/modal'
import * as ducksActionCreators from 'reduxConfig/modules/ducks'

function mapStateToProps ({ modal, users }) {
  const duckTextLength = modal.duckText.length
  return {
    user: users[users.authedId] ? users[users.authedId].info : {},
    duckText: modal.duckText,
    isOpen: modal.isOpen,
    isSubmitDisabled: duckTextLength <= 0 || duckTextLength > 140,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    { ...modalActionsCreators, ...ducksActionCreators },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
