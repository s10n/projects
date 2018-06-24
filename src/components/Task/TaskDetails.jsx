import React from 'react'
import { string } from 'prop-types'
import { fn } from '../../constants/propTypes'
import Form from '../Form'
import TaskAdd from './TaskAdd'

const propTypes = {
  id: string.isRequired,
  name: string.isRequired,
  description: string,
  fn
}

const defaultProps = {
  description: ''
}

const TaskDetails = ({ id, name, description, fn }) => (
  <article>
    <h1>{name}</h1>
    <Form
      fields={[{ name: 'description', type: 'textarea', value: description }]}
      onSubmit={fn.editTask(id)}
    />
    <TaskAdd onSubmit={fn.addTask({ task: id })} />
  </article>
)

TaskDetails.propTypes = propTypes
TaskDetails.defaultProps = defaultProps

export default TaskDetails
