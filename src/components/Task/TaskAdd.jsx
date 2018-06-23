import React from 'react'
import { func } from 'prop-types'
import Form from '../Form'

const propTypes = { onSubmit: func.isRequired }

const ProjectAdd = ({ onSubmit }) => (
  <Form fields={['name']} onSubmit={onSubmit} />
)

ProjectAdd.propTypes = propTypes

export default ProjectAdd
