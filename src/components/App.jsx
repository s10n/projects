import React, { Component, Fragment } from 'react'
import { object } from 'prop-types'
import uuidv4 from 'uuid/v4'
import './App.css'
import Header from './Header'
import Main from './Main'

class App extends Component {
  static propTypes = { db: object.isRequired }

  InitialState = { projects: {}, tasks: {} }
  state = this.InitialState

  componentDidMount() {
    const onValue = snap => this.setState(snap.val() || this.InitialState)
    const projectsRef = this.props.db.ref()
    projectsRef.on('value', onValue)
  }

  fn = () => {
    const set = (ref, list) => data => {
      const priority = Object.keys(list).length
      return this.props.db.ref(ref).set({ ...data, priority }, handleError)
    }

    const { projects, tasks } = this.state

    return {
      addProject: set(`projects/${uuidv4()}`, projects),
      addTask: id => set(`tasks/${id}/${uuidv4()}`, tasks[id] || {})
    }
  }

  render() {
    const fn = this.fn()

    return (
      <Fragment>
        <Header fn={fn} style={style.header} />
        <Main {...this.state} fn={fn} style={style.main} />
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
