import React from 'react'
import { func } from 'prop-types'
import Form from './Form'

const propTypes = { signin: func.isRequired }

const Signin = ({ signin }) => (
  <Form
    title="Sign in"
    style={style}
    fields={[
      { name: 'email', autoComplete: 'email' },
      { name: 'password', type: 'password', autoComplete: 'password' }
    ]}
    onSubmit={signin}
  />
)

Signin.propTypes = propTypes

const style = {
  maxWidth: 320,
  marginTop: 20,
  marginLeft: 'auto',
  marginRight: 'auto'
}

export default Signin
