import React from 'react'
import { object } from 'prop-types'
import { fn } from '../constants/propTypes'
import { sortWith } from '../utils'
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
    const props = { ...project, id, tasks: tasks[id], addTask: fn.addTask(id) }
    return <Project {...props} key={id} />
  }

  return (
    <main style={{ ...style, ...variant }}>
      {Object.entries(projects)
        .sort(sortWith('priority'))
        .map(renderProject)}
    </main>
  )
}

Main.propTypes = propTypes
Main.defaultProps = defaultProps

const style = { display: 'flex' }

export default Main
