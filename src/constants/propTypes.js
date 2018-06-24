import { string, arrayOf, shape, func } from 'prop-types'

export const task = {
  id: string,
  name: string.isRequired,
  subtasks: arrayOf(string),
  description: string
}

export const defaultTask = {
  subtasks: [],
  description: ''
}

const fnShape = {
  addProject: func.isRequired,
  addTask: func.isRequired,
  editTask: func.isRequired
}

export const fn = shape(fnShape).isRequired
