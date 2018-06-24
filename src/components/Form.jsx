import React, { Component } from 'react'
import { bool, string, arrayOf, object, shape, func } from 'prop-types'

class Form extends Component {
  fields = {
    name: string.isRequired,
    type: string,
    value: string,
    textarea: bool
  }

  static propTypes = {
    title: string,
    fields: arrayOf(shape(this.fields)).isRequired,
    style: object,
    shouldNotEmptyOnSubmit: bool,
    shouldResetOnSubmit: bool,
    onSubmit: func.isRequired
  }

  static defaultProps = {
    title: '',
    style: {},
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

  renderField = ({ name, textarea, width, ...rest }) => {
    const field = Object.assign(
      {
        name,
        value: this.state[name],
        style: { width },
        onChange: this.setValue,
        key: name,
        ...rest
      },
      textarea
        ? { onKeyDown: this.handleKeyDown }
        : { onKeyPress: this.handleEnter }
    )

    return textarea ? <textarea {...field} /> : <input {...field} />
  }

  render() {
    const { title, fields, style: variant } = this.props
    return (
      <form style={variant}>
        {title && <h1>{title}</h1>}
        {fields.map(this.renderField)}
      </form>
    )
  }
}

export default Form

/* Utility */
const getEmoji = s => [...s][0]
const getInitialState = array =>
  array.reduce((acc, { name, value }) => ({ ...acc, [name]: value || '' }), {})
