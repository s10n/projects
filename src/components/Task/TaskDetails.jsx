import React from 'react'
import { string, arrayOf } from 'prop-types'
import { fn } from '../../constants/propTypes'
import Form from '../Form'
import Tasks from './Tasks'

const propTypes = {
  id: string.isRequired,
  name: string.isRequired,
  subtasks: arrayOf(string),
  description: string,
  fn
}

const defaultProps = {
  subtasks: [],
  description: ''
}

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
