import React from 'react'
import { string } from 'prop-types'

const propTypes = { icon: string.isRequired, name: string.isRequired }

const Project = ({ icon, name }) => (
  <article>
    <h1>{icon + name}</h1>
  </article>
)

Project.propTypes = propTypes

export default Project
