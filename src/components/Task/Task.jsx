import React from 'react'
import { string } from 'prop-types'

const propTypes = { name: string.isRequired }

const Task = ({ name }) => (
  <article>
    <h1>{name}</h1>
  </article>
)

Task.propTypes = propTypes

export default Task
