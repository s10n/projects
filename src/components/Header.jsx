import React from 'react'
import { object } from 'prop-types'
import { fn } from '../constants/propTypes'
import ProjectAdd from './Project/ProjectAdd'

const propTypes = { fn, style: object }
const defaultProps = { style: {} }

const Header = ({ fn, style: variant }) => (
  <header style={{ ...style, ...variant }}>
    <ProjectAdd style={style.input} onSubmit={fn.addProject} />
    <button style={style.button} onClick={fn.signout}>
      →
    </button>
  </header>
)

Header.propTypes = propTypes
Header.defaultProps = defaultProps

const style = {
  display: 'flex',
  input: { flex: 1 },
  button: { flex: 'none', width: '2rem' }
}

export default Header
