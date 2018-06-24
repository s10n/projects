import React from 'react'
import { string, arrayOf, object, func } from 'prop-types'
import Task from '../Task/Task'
import TaskAdd from '../Task/TaskAdd'
import TaskContext from '../Task/TaskContext'

const propTypes = {
  id: string.isRequired,
  icon: string.isRequired,
  name: string.isRequired,
  list: arrayOf(string),
  tasks: object,
  addTask: func.isRequired
}

const defaultProps = {
  list: [],
  tasks: {}
}

const Project = ({ id, icon, name, list, tasks, addTask }) => {
  const renderTask = taskId => (
    <TaskContext.Consumer key={taskId}>
      {({ setCurrent }) => {
        const onClick = () => setCurrent(taskId)
        return <Task {...tasks[taskId]} onClick={onClick} />
      }}
    </TaskContext.Consumer>
  )

  return (
    <article>
      <h1>{icon + name}</h1>
      <section>{list.map(renderTask)}</section>
      <TaskAdd onSubmit={addTask} />
    </article>
  )
}

Project.propTypes = propTypes
Project.defaultProps = defaultProps

export default Project
