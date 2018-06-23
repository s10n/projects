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
  const sortProjects = ([keyA, projectA], [keyB, projectB]) =>
    projectA.priority - projectB.priority

  const renderProject = ([key, project]) => {
    const props = { ...project, tasks: tasks[key], addTask: fn.addTask(key) }
    return <Project {...props} key={key} />
  }

  return (
    <main style={{ ...style, ...variant }}>
      {Object.entries(projects)
        .sort(sortProjects)
        .map(renderProject)}
    </main>
  )
}

Main.propTypes = propTypes
Main.defaultProps = defaultProps

const style = { display: 'flex' }

export default Main
