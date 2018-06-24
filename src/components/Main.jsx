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
      style: style.project,
      onAddTask: fn.addTask({ project: id })
    }

    return <Project {...props} key={id} />
  }

  return <main style={{ ...style, ...variant }}>{list.map(renderProject)}</main>
}

Main.propTypes = propTypes
Main.defaultProps = defaultProps

const style = {
  display: 'flex',
  flexWrap: 'wrap',
  project: { width: 100 / 3 + '%', padding: 10 }
}

export default Main
