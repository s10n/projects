import React from 'react'
import { object } from 'prop-types'
import Project from './Project/Project'

const propTypes = { projects: object.isRequired }

const Main = ({ projects }) =>
  Object.entries(projects).map(([key, value]) => (
    <Project {...value} key={key} />
  ))

Main.propTypes = propTypes

export default Main
