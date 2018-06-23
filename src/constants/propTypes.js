import { shape, func } from 'prop-types'

const fnShape = {
  addProject: func.isRequired,
  addTask: func.isRequired
}

export const fn = shape(fnShape).isRequired
