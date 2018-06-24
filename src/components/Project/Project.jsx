import React from 'react'
import { string } from 'prop-types'
import Tasks from '../Task/Tasks'
import TaskContext from '../Task/TaskContext'

const propTypes = { icon: string.isRequired, name: string.isRequired }

const Project = ({ icon, name, ...rest }) => (
  <article>
    <h1>{icon + name}</h1>
    <TaskContext.Consumer>
      {({ setCurrent }) => <Tasks {...rest} onTaskClick={setCurrent} />}
    </TaskContext.Consumer>
  </article>
)

Project.propTypes = propTypes

export default Project
