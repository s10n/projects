import React, { Component } from 'react'
import { object } from 'prop-types'
import { cond, equals } from 'ramda'
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

  InitialData = { list: [], projects: {}, tasks: {} }
  state = { ...this.InitialData, current: null, hover: null }

  componentDidMount() {
    const onValue = snap => this.setState(snap.val() || this.InitialData)
    const projectsRef = this.props.db.ref()
    projectsRef.on('value', onValue)
    document.addEventListener('keypress', this.handleKeyPress)
  }

  handleKeyPress = event =>
    this.state.hover &&
    cond([
      [equals('4'), () => this.setImportant(1)],
      [equals('3'), () => this.setImportant(0)],
      [equals('2'), () => this.setImportant(-1)],
      [equals('='), () => this.setSize(1)],
      [equals('0'), () => this.setSize(null)],
      [equals('-'), () => this.setSize(-1)]
    ])(event.key)

  getContext = () => ({
    ...this.state,
    setCurrent: this.setCurrent,
    setHover: this.setHover
  })

  getFunctions = () => {
    const set = ref => data => db.ref(ref).set(data, handleError)
    const update = ref => data => db.ref(ref).update(data, handleError)

    const { db } = this.props
    const { list, projects, tasks } = this.state

    return {
      addProject: data => {
        const id = uuidv4()
        set(`projects/${id}`)(data)
        set('list')([...list, id])
      },
      addTask: ({ project, task }) => data => {
        const id = uuidv4()
        const { list = [] } = projects[project] || {}
        const { subtasks = [] } = tasks[task] || {}
        set(`tasks/${id}`)(data)
        project && update(`projects/${project}`)({ list: [...list, id] })
        task && update(`tasks/${task}`)({ subtasks: [...subtasks, id] })
      },
      editTask: id => update(`tasks/${id}`)
    }
  }

  setTask = (key, value) => {
    const { hover } = this.state
    const { editTask } = this.getFunctions()
    editTask(hover)({ [key]: value })
  }

  setImportant = important => {
    const { tasks, hover } = this.state
    const task = tasks[hover]
    this.setTask('important', task.important === important ? null : important)
  }

  setSize = size => this.setTask('size', size)

  setCurrent = current => this.setState({ current })
  resetCurrent = () => this.setCurrent()

  setHover = hover => this.setState({ hover })
  resetHover = () => this.setHover()

  render() {
    const { list, projects, tasks, current } = this.state
    const fn = this.getFunctions()
    const currentTask = tasks[current]

    return (
      <TaskContext.Provider value={this.getContext()}>
        <Header fn={fn} style={style.header} />
        <Main list={list} projects={projects} style={style.main} fn={fn} />

        {!!current && (
          <Modal isOpen={!!current} onRequestClose={this.resetCurrent}>
            <TaskDetails {...currentTask} id={current} fn={fn} />
          </Modal>
        )}
      </TaskContext.Provider>
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
