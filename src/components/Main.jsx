import React from 'react'
import { object } from 'prop-types'
import { fn } from '../constants/propTypes'
import Project from './Project/Project'

const propTypes = {
  projects: object.isRequired,
  tasks: object.isRequired,
  fn,
  style: object
}

const defaultProps = {
  style: {}
}

const Main = ({ projects, tasks, fn, style: variant }) => {
  const renderProject = ([id, project]) => {
    const props = {
      ...project,
      id,
      tasks,
      addTask: fn.addTask({ project: id })
    }

    return <Project {...props} key={id} />
  }

  return (
    <main style={{ ...style, ...variant }}>
      {Object.entries(projects).map(renderProject)}
    </main>
  )
}

Main.propTypes = propTypes
Main.defaultProps = defaultProps

const style = { display: 'flex' }

export default Main
