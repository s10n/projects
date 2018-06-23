import React from 'react'
import { shape, func } from 'prop-types'
import ProjectAdd from './Project/ProjectAdd'

const propTypes = { fn: shape({ addProject: func.isRequired }).isRequired }

const Header = ({ fn }) => (
  <header>
    <ProjectAdd onSubmit={fn.addProject} />
  </header>
)

Header.propTypes = propTypes

export default Header
