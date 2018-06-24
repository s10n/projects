import React from 'react'
import { string, arrayOf, func } from 'prop-types'
import Task from './Task'
import TaskAdd from './TaskAdd'
import TaskContext from './TaskContext'

const propTypes = {
  list: arrayOf(string),
  onAddTask: func.isRequired,
  onTaskClick: func
}

const defaultProps = {
  list: [],
  onTaskClick: () => {}
}

const Tasks = ({ list, onAddTask, onTaskClick }) => (
  <TaskContext.Consumer>
    {({ tasks }) => {
      const renderTask = id => {
        const onClick = () => onTaskClick(id)
        return <Task id={id} {...tasks[id]} onClick={onClick} key={id} />
      }

      return (
        <div>
          <section>{list.map(renderTask)}</section>
          <TaskAdd onSubmit={onAddTask} />
        </div>
      )
    }}
  </TaskContext.Consumer>
)

Tasks.propTypes = propTypes
Tasks.defaultProps = defaultProps

export default Tasks
