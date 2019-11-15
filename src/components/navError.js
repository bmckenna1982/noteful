import React from 'react'

export default class NavError extends React.Component {
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
        <h2>An error has occured building the folder list</h2>
      )
    }
    return this.props.children
  }
}