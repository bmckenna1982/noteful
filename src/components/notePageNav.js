import React from 'react'
import NotefulContext from '../NotefulContext'


class NotePageNav extends React.Component {
  static contextType = NotefulContext
  render() {    
    console.log('this.props.history.location', this.props.history.location)
    const folder = this.props.history.location.folderId
      ? this.context.findFolder(this.props.history.location.folderId)
      : { folder_name: 'test'}
    return (
      <div className='NotePageNav'>
        <button className='NotePageNav_back_button' onClick={() => this.props.history.goBack()}>
          Go Back
        </button>
        <h2>{folder.folder_name}</h2>
      </div>
    )
  }
}

export default NotePageNav