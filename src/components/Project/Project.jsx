import React from 'react'
import { string, object } from 'prop-types'
import Tasks from '../Task/Tasks'
import TaskContext from '../Task/TaskContext'

const propTypes = {
  icon: string.isRequired,
  name: string.isRequired,
  style: object
}

const defaultProps = {
  style: {}
}

const Project = ({ icon, name, style: variant, ...rest }) => (
  <article style={variant}>
    <h1>{icon + name}</h1>
    <TaskContext.Consumer>
      {({ setCurrent }) => <Tasks {...rest} onTaskClick={setCurrent} />}
    </TaskContext.Consumer>
  </article>
)

Project.propTypes = propTypes
Project.defaultProps = defaultProps

export default Project
