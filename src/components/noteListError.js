import React from 'react'

export default class NoteListError extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2>An error has occured building the list of Notes</h2>
      )
    }
    return this.props.children
  }
}