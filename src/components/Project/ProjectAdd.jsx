import React, { Component } from 'react'
import { func } from 'prop-types'

class ProjectAdd extends Component {
  static propTypes = { onSubmit: func.isRequired }
  state = { icon: '', name: '' }

  reset = () => this.setState({ icon: '', name: '' })
  setIcon = event => this.setState({ icon: event.target.value })
  setName = event => this.setState({ name: event.target.value })
  handleKeyPress = event => event.key === 'Enter' && this.submit()

  validate = () => {
    const { icon, name } = this.trim()
    return !!(icon && name)
  }

  trim = () => {
    const { icon, name } = this.state
    return { icon: getEmoji(icon.trim()), name: name.trim() }
  }

  submit = () =>
    this.validate() &&
    (() => {
      this.props.onSubmit(this.trim())
      this.reset()
    })()

  renderField = field => <input {...field} onKeyPress={this.handleKeyPress} />

  render() {
    const { icon, name } = this.state
    const fields = [
      { onChange: this.setIcon, value: icon, key: 'icon' },
      { onChange: this.setName, value: name, key: 'name' }
    ]

    return (
      <div>
        {fields.map(this.renderField)}
        <button onClick={this.submit}>프로젝트 생성</button>
      </div>
    )
  }
}

export default ProjectAdd

/* Utility */
const getEmoji = s => [...s][0]
