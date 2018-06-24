import React from 'react'
import { task, defaultTask, fn } from '../../constants/propTypes'
import Form from '../Form'
import Tasks from './Tasks'

const propTypes = { ...task, fn }
const defaultProps = defaultTask

const TaskDetails = ({ id, name, subtasks, description, fn }) => (
  <article>
    <h1>{name}</h1>
    <Form
      fields={[{ name: 'description', type: 'textarea', value: description }]}
      onSubmit={fn.editTask(id)}
    />
    <Tasks list={subtasks} onAddTask={fn.addTask({ task: id })} />
  </article>
)

TaskDetails.propTypes = propTypes
TaskDetails.defaultProps = defaultProps

export default TaskDetails
