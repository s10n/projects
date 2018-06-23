import React, { Component } from 'react'

class ProjectAdd extends Component {
  state = { icon: '', name: '' }

  setIcon = event => this.setState({ icon: event.target.value })
  setName = event => this.setState({ name: event.target.value })
  submit = () => {}

  render() {
    const { icon, name } = this.state

    return (
      <form>
        <input value={icon} onChange={this.setIcon} />
        <input value={name} onChange={this.setName} />
        <button onClick={this.submit}>프로젝트 생성</button>
      </form>
    )
  }
}

export default ProjectAdd
