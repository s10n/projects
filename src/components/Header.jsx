import React from 'react'
import { object } from 'prop-types'
import { fn } from '../constants/propTypes'
import ProjectAdd from './Project/ProjectAdd'

const propTypes = { fn, style: object }
const defaultProps = { style: {} }

const Header = ({ fn, style: variant }) => (
  <header style={variant}>
    <ProjectAdd onSubmit={fn.addProject} />
  </header>
)

Header.propTypes = propTypes
Header.defaultProps = defaultProps

export default Header
