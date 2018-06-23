import React, { Component, Fragment } from 'react'
import { object } from 'prop-types'
import uuidv4 from 'uuid/v4'
import './App.css'
import Header from './Header'
import Main from './Main'

class App extends Component {
  static propTypes = { db: object.isRequired }
  state = {}

  componentDidMount() {
    const projectsRef = this.props.db.ref()
    projectsRef.on('value', snap => this.setState(snap.val() || {}))
  }

  fn = () => {
    const set = ref => data => this.props.db.ref(ref).set(data, handleError)

    return {
      addProject: set(`projects/${uuidv4()}`),
      addTask: id => set(`tasks/${id}/${uuidv4()}`)
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
