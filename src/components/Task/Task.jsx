import React from 'react'
import { func } from 'prop-types'
import { task, defaultTask } from '../../constants/propTypes'
import TaskContext from './TaskContext'

const propTypes = { ...task, onClick: func }
const defaultProps = { ...defaultTask, onClick: () => {} }

const Task = ({ name, subtasks, onClick }) => (
  <article style={style} onClick={onClick}>
    <h1>{name}</h1>
    {subtasks && (
      <TaskContext.Consumer>
        {({ tasks }) => subtasks.map(task => tasks[task].name).join('·')}
      </TaskContext.Consumer>
    )}
  </article>
)

Task.propTypes = propTypes
Task.defaultProps = defaultProps

const style = { display: 'flex', cursor: 'pointer', userSelect: 'none' }

export default Task
