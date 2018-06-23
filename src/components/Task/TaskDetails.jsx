import React from 'react'
import { string } from 'prop-types'

const propTypes = { name: string.isRequired, description: string }
const defaultProps = { description: '' }

const TaskDetails = ({ name, description }) => (
  <article>
    <h1>{name}</h1>
    <p>{description}</p>
  </article>
)

TaskDetails.propTypes = propTypes
TaskDetails.defaultProps = defaultProps

export default TaskDetails
