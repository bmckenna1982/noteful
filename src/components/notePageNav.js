import React from 'react'
import NotefulContext from '../NotefulContext'


class NotePageNav extends React.Component {
  static contextType = NotefulContext
  render() {    
    const folder = this.context.findFolder(this.props.history.location.folderId)
    return (
      <div className='NotePageNav'>
        <button className='NotePageNav_back_button' onClick={() => this.props.history.goBack()}>
          Go Back
        </button>
        <h2>{folder.name}</h2>
      </div>
    )
  }
}

export default NotePageNav