import React from 'react'
import { string, object, func } from 'prop-types'
import Task from '../Task/Task'
import TaskAdd from '../Task/TaskAdd'

const propTypes = {
  icon: string.isRequired,
  name: string.isRequired,
  tasks: object,
  addTask: func.isRequired
}

const defaultProps = {
  tasks: {}
}

const Project = ({ icon, name, tasks, addTask }) => (
  <article>
    <h1>{icon + name}</h1>
    <section>
      {Object.entries(tasks)
        .sort(sortTasks)
        .map(renderTask)}
    </section>
    <TaskAdd onSubmit={addTask} />
  </article>
)

Project.propTypes = propTypes
Project.defaultProps = defaultProps

export default Project

/* render */
const sortTasks = ([keyA, taskA], [keyB, taskB]) =>
  taskA.priority - taskB.priority
const renderTask = ([key, task]) => <Task {...task} key={key} />
