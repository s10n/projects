import React from 'react'
import { func } from 'prop-types'
import Form from '../Form'

const propTypes = { onSubmit: func.isRequired }

const ProjectAdd = ({ onSubmit }) => (
  <Form
    fields={[{ name: 'icon' }, { name: 'name' }]}
    onSubmit={onSubmit}
    shouldNotEmptyOnSubmit
    shouldResetOnSubmit
  />
)

ProjectAdd.propTypes = propTypes

export default ProjectAdd
