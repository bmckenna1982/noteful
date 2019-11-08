import React from 'react'
import NotefulContext from '../NotefulContext'
import { Link } from 'react-router-dom'

class NotePageNav extends React.Component {
  static contextType = NotefulContext
  render() {
    console.log(this.context)
    const folder = this.context.findFolder(this.props.history.location.folderId)
    return (
      <div className='NotePageNav'>
        <button className='NotePageNav_back_button'>
          Go Back
        </button>
        <h2>{folder.name}</h2>
      </div>
    )
  }
}

export default NotePageNav