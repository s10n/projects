import React, { Component, Fragment } from 'react'
import { object } from 'prop-types'
import uuidv4 from 'uuid/v4'
import './App.css'
import Header from './Header'
import Main from './Main'

class App extends Component {
  static propTypes = { db: object.isRequired }
  state = { projects: {} }

  componentDidMount() {
    const onValue = snap => this.setState({ projects: snap.val() || {} })
    const projectsRef = this.props.db.ref('projects/')
    projectsRef.on('value', onValue)
  }

  addProject = data =>
    this.props.db.ref('projects/' + uuidv4()).set(data, handleError)

  render() {
    return (
      <Fragment>
        <Header fn={{ addProject: this.addProject }} />
        <Main projects={this.state.projects} />
      </Fragment>
    )
  }
}

export default App

/* Utility */
const handleError = error => error && alert(error.message)
