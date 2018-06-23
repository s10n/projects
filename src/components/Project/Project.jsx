import React from 'react'
import { string, object, func } from 'prop-types'
import { sortWith } from '../../utils'
import Task from '../Task/Task'
import TaskAdd from '../Task/TaskAdd'
import TaskContext from '../Task/TaskContext'

const propTypes = {
  id: string.isRequired,
  icon: string.isRequired,
  name: string.isRequired,
  tasks: object,
  addTask: func.isRequired
}

const defaultProps = {
  tasks: {}
}

const Project = ({ id, icon, name, tasks, addTask }) => {
  const renderTask = ([taskId, task]) => (
    <TaskContext.Consumer key={taskId}>
      {({ setCurrent }) => {
        const onClick = () => setCurrent({ project: id, task: taskId })
        return <Task {...task} onClick={onClick} />
      }}
    </TaskContext.Consumer>
  )

  return (
    <article>
      <h1>{icon + name}</h1>
      <section>
        {Object.entries(tasks)
          .sort(sortWith('priority'))
          .map(renderTask)}
      </section>
      <TaskAdd onSubmit={addTask} />
    </article>
  )
}

Project.propTypes = propTypes
Project.defaultProps = defaultProps

export default Project
