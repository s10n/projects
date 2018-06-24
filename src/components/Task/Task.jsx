import React from 'react'
import { func } from 'prop-types'
import { task, defaultTask } from '../../constants/propTypes'
import TaskContext from './TaskContext'

const propTypes = { ...task, onClick: func }
const defaultProps = { ...defaultTask, onClick: () => {} }

const Task = ({ id, name, subtasks, onClick }) => (
  <TaskContext.Consumer>
    {({ tasks, hover, setHover }) => {
      const attr = {
        style: Object.assign({}, style, hover === id && style.hover),
        onClick,
        onMouseEnter: () => setHover(id),
        onMouseDown: setHover,
        onMouseLeave: setHover
      }

      return (
        <article {...attr}>
          <h1>{name}</h1>
          {subtasks &&
            subtasks.map(id => <Task id={id} {...tasks[id]} key={id} />)}
        </article>
      )
    }}
  </TaskContext.Consumer>
)

Task.propTypes = propTypes
Task.defaultProps = defaultProps

const style = {
  display: 'flex',
  cursor: 'pointer',
  userSelect: 'none',
  hover: { backgroundColor: 'silver' }
}

export default Task
