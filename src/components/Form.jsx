import React, { Component } from 'react'
import { bool, string, arrayOf, shape, func } from 'prop-types'

class Form extends Component {
  fields = { name: string.isRequired, type: string, value: string }

  static propTypes = {
    fields: arrayOf(shape(this.fields)).isRequired,
    shouldNotEmptyOnSubmit: bool,
    shouldResetOnSubmit: bool,
    onSubmit: func.isRequired
  }

  static defaultProps = {
    shouldNotEmptyOnSubmit: false,
    shouldResetOnSubmit: false
  }

  state = getInitialState(this.props.fields)

  reset = () => this.setState(getInitialState(this.props.fields))
  setValue = event => this.setState({ [event.target.name]: event.target.value })

  handleKeyDown = event => event.metaKey && this.handleEnter(event)
  handleEnter = event =>
    event.key === 'Enter' && this.validate() && this.submit()

  trim = () => {
    const fn = (acc, [key, value]) => ({
      ...acc,
      [key]: (key === 'icon' ? getEmoji(value.trim()) : value.trim()) || null
    })

    return Object.entries(this.state).reduce(fn, {})
  }

  validate = () =>
    !this.props.shouldNotEmptyOnSubmit ||
    Object.values(this.trim()).every(Boolean)

  submit = () => {
    const { onSubmit, shouldResetOnSubmit } = this.props
    onSubmit(this.trim())
    shouldResetOnSubmit && this.reset()
  }

  renderField = ({ name, type }) => {
    const isTextarea = type === 'textarea'
    const field = Object.assign(
      { name, value: this.state[name], onChange: this.setValue, key: name },
      isTextarea
        ? { onKeyDown: this.handleKeyDown }
        : { onKeyPress: this.handleEnter }
    )

    return isTextarea ? <textarea {...field} /> : <input {...field} />
  }

  render() {
    return this.props.fields.map(this.renderField)
  }
}

export default Form

/* Utility */
const getEmoji = s => [...s][0]
const getInitialState = array =>
  array.reduce((acc, { name, value }) => ({ ...acc, [name]: value || '' }), {})
