import React from 'react'
import { string } from 'prop-types'
import { fn } from '../../constants/propTypes'
import Form from '../Form'

const propTypes = { name: string.isRequired, description: string, fn }
const defaultProps = { description: '' }

const TaskDetails = ({ name, description, id, fn }) => (
  <article>
    <h1>{name}</h1>
    <Form
      fields={[{ name: 'description', type: 'textarea', value: description }]}
      onSubmit={fn.editTask(id)}
    />
  </article>
)

TaskDetails.propTypes = propTypes
TaskDetails.defaultProps = defaultProps

export default TaskDetails
