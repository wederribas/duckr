import React from 'react'
import PropTypes from 'prop-types'

Authenticate.propTypes = {
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
}

export default function Authenticate ({ error, isFetching, onAuth }) {
  return (
    <div>
      <h1>{'Authenticate'}</h1>
      <p>{'Facebook auth button'}</p>
      {error ? <p>{'error'}</p> : null}
    </div>
  )
}
