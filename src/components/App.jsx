import React, { Component, Fragment } from 'react'
import { object } from 'prop-types'
import uuidv4 from 'uuid/v4'
import './App.css'
import Modal from 'react-modal'
import Header from './Header'
import Main from './Main'
import TaskDetails from './Task/TaskDetails'
import TaskContext from './Task/TaskContext'

Modal.setAppElement('#projects')
class App extends Component {
  static propTypes = { db: object.isRequired }

  InitialData = { projects: {}, tasks: {} }
  state = { ...this.InitialData, current: null }

  componentDidMount() {
    const onValue = snap => this.setState(snap.val() || this.InitialData)
    const projectsRef = this.props.db.ref()
    projectsRef.on('value', onValue)
  }

  fn = () => {
    const set = (ref, list) => data => {
      const priority = !!list && Object.keys(list).length
      const next = Object.assign(data, !!list && { priority })
      return db.ref(ref).set(next, handleError)
    }

    const update = ref => data => db.ref(ref).update(data, handleError)

    const { db } = this.props
    const { projects, tasks } = this.state

    return {
      addProject: set(`projects/${uuidv4()}`, projects),
      addTask: id => set(`tasks/${id}/${uuidv4()}`, tasks[id] || {}),
      editTask: ({ project, task }) => update(`tasks/${project}/${task}`)
    }
  }

  getCurrent = () => {
    const { tasks, current } = this.state
    const { project, task } = current || {}
    return !!(project && task) && tasks[project][task]
  }

  setCurrent = current => this.setState({ current })
  resetCurrent = () => this.setCurrent()

  render() {
    const { current, ...rest } = this.state
    const fn = this.fn()
    const currentTask = this.getCurrent()

    return (
      <Fragment>
        <Header fn={fn} style={style.header} />
        <TaskContext.Provider value={{ setCurrent: this.setCurrent }}>
          <Main {...rest} fn={fn} style={style.main} />
        </TaskContext.Provider>

        {!!currentTask && (
          <Modal isOpen={!!currentTask} onRequestClose={this.resetCurrent}>
            <TaskDetails {...currentTask} id={current} fn={fn} />
          </Modal>
        )}
      </Fragment>
    )
  }
}

const style = {
  header: { flex: 'none' },
  main: { flex: 1 }
}

export default App

/* Utility */
const handleError = error => error && alert(error.message)
