import React from 'react'
import { object } from 'prop-types'
import { fn } from '../constants/propTypes'
import Project from './Project/Project'

const propTypes = { projects: object, tasks: object, fn, style: object }
const defaultProps = { projects: {}, tasks: {}, style: {} }

const Main = ({ projects, tasks, fn, style: variant }) => {
  const renderProject = ([key, value]) => {
    const props = { ...value, tasks: tasks[key], addTask: fn.addTask(key) }
    return <Project {...props} key={key} />
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
