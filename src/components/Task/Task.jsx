import React from 'react'
import { bool, object, func } from 'prop-types'
import { task, defaultTask } from '../../constants/propTypes'
import { cond, equals, always } from 'ramda'
import TaskContext from './TaskContext'

const propTypes = {
  ...task,
  isSubtask: bool,
  style: object,
  onClick: func
}

const defaultProps = {
  ...defaultTask,
  isSubtask: false,
  style: {},
  onClick: () => {}
}

const Task = ({ id, name, important, size, subtasks, isSubtask, ...rest }) => {
  const { style: variant, onClick } = rest
  const hasSubtasks = !!subtasks.length

  return (
    <TaskContext.Consumer>
      {({ tasks, hover, setHover }) => {
        const attr = {
          style: Object.assign(
            {},
            variant,
            !isSubtask && Object.assign({}, style.task, getSize(size)),
            hover === id && style.hover
          ),
          onClick,
          onMouseOver: e => {
            e.stopPropagation()
            setHover(id)
          },
          onMouseLeave: () => {
            setHover()
          },
          onMouseDown: () => {
            setHover()
          }
        }

        return (
          <article {...attr}>
            {!isSubtask && (
              <div style={{ ...style.indicator, ...getColor(important) }} />
            )}

            <span style={{ ...style.name, fontWeight: hasSubtasks && 'bold' }}>
              {name}
            </span>

            {subtasks &&
              subtasks.map(id => (
                <Task id={id} {...tasks[id]} isSubtask key={id} />
              ))}
          </article>
        )
      }}
    </TaskContext.Consumer>
  )
}

Task.propTypes = propTypes
Task.defaultProps = defaultProps

const card = { border: '1px solid hsl(0, 0%, 80%)' }
const style = {
  task: {
    ...card,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    fontSize: 14
  },

  indicator: { width: 4, alignSelf: 'stretch' },
  name: { paddingLeft: 5, paddingRight: 5 },
  hover: { backgroundColor: 'hsl(0, 0%, 94%)' }
}

export default Task

/* Utility */
const colors = {
  red: 'hsl(7, 80%, 60%)',
  orange: 'hsl(35, 100%, 55%)',
  yellow: 'hsl(53, 100%, 47%)'
}
const getColor = important => ({
  backgroundColor: cond([
    [equals(1), always(colors.red)],
    [equals(0), always(colors.orange)],
    [equals(-1), always(colors.yellow)]
  ])(important)
})

const getSize = size => ({
  height:
    cond([[equals(-1), always('1.5rem')], [equals(1), always('6rem')]])(size) ||
    '2rem'
})
