import React from 'react'
import { string, func } from 'prop-types'

const propTypes = { name: string.isRequired, onClick: func.isRequired }

const Task = ({ name, onClick }) => (
  <article style={style} onClick={onClick}>
    <h1>{name}</h1>
    <div style={{ color: 'silver' }}>Description</div>
  </article>
)

Task.propTypes = propTypes

const style = { display: 'flex', cursor: 'pointer', userSelect: 'none' }

export default Task
