import React from 'react'
import { Link } from 'react-router-dom'

class NotePageNav extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div className='NotePageNav'>
        <button className='NotePageNav_back_button'>
          Go Back
        </button>
        <h2>{this.props.folder.name}</h2>
      </div>
    )
  }
}

export default NotePageNav