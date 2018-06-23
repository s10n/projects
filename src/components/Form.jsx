import React, { Component } from 'react'
import { string, arrayOf, func } from 'prop-types'

class Add extends Component {
  static propTypes = {
    fields: arrayOf(string),
    onSubmit: func.isRequired
  }

  state = getInitialState(this.props.fields)

  reset = () => this.setState(getInitialState(this.props.fields))
  setValue = event => this.setState({ [event.target.name]: event.target.value })
  handleKeyPress = event => event.key === 'Enter' && this.submit()

  trim = () => {
    const fn = (acc, [key, value]) => ({
      ...acc,
      [key]: key === 'icon' ? getEmoji(value.trim()) : value.trim()
    })

    return Object.entries(this.state).reduce(fn, {})
  }

  validate = () => Object.values(this.trim()).every(Boolean)

  submit = () =>
    this.validate() &&
    (() => {
      this.props.onSubmit(this.trim())
      this.reset()
    })()

  renderField = field => (
    <input
      name={field}
      value={this.state[field]}
      onChange={this.setValue}
      onKeyPress={this.handleKeyPress}
      key={field}
    />
  )

  render() {
    return this.props.fields.map(this.renderField)
  }
}

export default Add

/* Utility */
const getEmoji = s => [...s][0]
const getInitialState = array => array.reduce((a, c) => ({ ...a, [c]: '' }), {})
