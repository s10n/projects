import React from 'react'
import { string, arrayOf, object } from 'prop-types'
import { fn } from '../constants/propTypes'
import Project from './Project/Project'

const propTypes = {
  list: arrayOf(string).isRequired,
  projects: object.isRequired,
  fn,
  style: object
}

const defaultProps = {
  style: {}
}

const Main = ({ list, projects, fn, style: variant }) => {
  const renderProject = id => {
    const props = {
      ...projects[id],
      id,
      onAddTask: fn.addTask({ project: id })
    }

    return <Project {...props} key={id} />
  }

  return <main style={{ ...style, ...variant }}>{list.map(renderProject)}</main>
}

Main.propTypes = propTypes
Main.defaultProps = defaultProps

const style = { display: 'flex' }

export default Main
