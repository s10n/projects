import React, { Component } from 'react'
import { object } from 'prop-types'
import { cond, equals, without } from 'ramda'
import uuidv4 from 'uuid/v4'
import './App.css'
import Modal from 'react-modal'
import Header from './Header'
import Main from './Main'
import TaskDetails from './Task/TaskDetails'
import TaskContext from './Task/TaskContext'
import Signin from './Signin'

Modal.setAppElement('#projects')
class App extends Component {
  static propTypes = { auth: object.isRequired, db: object.isRequired }

  InitialData = { list: [], projects: {}, tasks: {} }
  InitialUser = { user: null, idle: true }
  InitialApp = { current: null, hover: null }
  state = { ...this.InitialUser, ...this.InitialData, ...this.InitialApp }

  componentDidMount() {
    const { auth, db } = this.props
    const onValue = snap => this.setState(snap.val() || this.InitialData)
    const onAuth = user =>
      this.setState({ user, idle: false }, () => db.ref().on('value', onValue))
    auth.onAuthStateChanged(onAuth)
    document.addEventListener('keypress', this.handleKeyPress)
  }

  /* Auth */
  signin = ({ email, password }) =>
    this.props.auth
      .signInWithEmailAndPassword(email, password)
      .catch(handleError)

  handleKeyPress = event =>
    this.state.hover &&
    cond([
      [equals('4'), () => this.setImportant(1)],
      [equals('3'), () => this.setImportant(0)],
      [equals('2'), () => this.setImportant(-1)],
      [equals('='), () => this.setSize(1)],
      [equals('0'), () => this.setSize(null)],
      [equals('-'), () => this.setSize(-1)],
      [equals('c'), () => this.deleteTask()]
    ])(event.key)

  getContext = () => ({
    ...this.state,
    setCurrent: this.setCurrent,
    setHover: this.setHover
  })

  getFunctions = () => {
    const set = ref => data => db.ref(ref).set(data, handleError)
    const update = ref => data => db.ref(ref).update(data, handleError)
    const remove = ref => db.ref(ref).remove()

    const { auth, db } = this.props
    const { list, projects, tasks } = this.state

    return {
      signout: () => auth.signOut(),
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
      editTask: id => update(`tasks/${id}`),
      deleteTask: id => {
        const find = (object, key) =>
          Object.entries(object).find(
            ([_, value]) => value[key] && value[key].includes(id)
          )

        const withoutId = without(id)

        /* 상위 프로젝트의 목록에서 제거 */
        const [projectId, project] = find(projects, 'list') || []
        projectId &&
          update(`projects/${projectId}`)({ list: withoutId(project.list) })

        /* 상위 태스크의 서브태스크에서 제거 */
        const [taskId, task] = find(tasks, 'subtasks') || []
        taskId &&
          update(`tasks/${taskId}`)({ subtasks: withoutId(task.subtasks) })

        /* 서브태스크들 제거 */
        const { subtasks = [] } = tasks[id] || {}
        update('tasks')(
          subtasks.reduce((acc, cur) => ({ ...acc, [cur]: null }), {})
        )

        /* 제거 */
        remove(`tasks/${id}`)
      }
    }
  }

  /* Task */
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

  deleteTask = () => {
    const { tasks, hover } = this.state
    const { deleteTask } = this.getFunctions()
    window.confirm(`Delete ${tasks[hover].name}?`) && deleteTask(hover)
  }

  /* state */
  setCurrent = current => this.setState({ current })
  resetCurrent = () => this.setCurrent()

  setHover = hover => this.setState({ hover })
  resetHover = () => this.setHover()

  render() {
    const { user, idle, list, projects, tasks, current } = this.state
    const fn = this.getFunctions()
    const currentTask = tasks[current]

    return idle ? null : user ? (
      <TaskContext.Provider value={this.getContext()}>
        <Header fn={fn} style={style.header} />
        <Main list={list} projects={projects} style={style.main} fn={fn} />

        {!!current && (
          <Modal isOpen={!!current} onRequestClose={this.resetCurrent}>
            <TaskDetails {...currentTask} id={current} fn={fn} />
          </Modal>
        )}
      </TaskContext.Provider>
    ) : (
      <Signin signin={this.signin} />
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
