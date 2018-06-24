import React from 'react'
import { object, func } from 'prop-types'
import Form from '../Form'

const propTypes = { style: object, onSubmit: func.isRequired }
const defaultProps = { style: {} }

const ProjectAdd = ({ style: variant, onSubmit }) => (
  <Form
    fields={[{ name: 'icon', style: { width: '2rem' } }, { name: 'name' }]}
    style={{ ...variant, display: 'flex' }}
    onSubmit={onSubmit}
    shouldNotEmptyOnSubmit
    shouldResetOnSubmit
  />
)

ProjectAdd.propTypes = propTypes
ProjectAdd.defaultProps = defaultProps

export default ProjectAdd
