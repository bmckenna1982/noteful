import React from 'react'
import { Link } from 'react-router-dom'
import NotefulContext from '../NotefulContext'

function deleteNoteRequest(noteId, callback) {
  const url = `http://localhost:9090/notes/${noteId}`
  fetch(url, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status)
      }
      return response.json()
        .then(responseJson => callback(noteId))
        .then(() => this.props.history.push('/'))
        .catch(error => console.error(error))
    })
}

class Note extends React.Component {
  static contextType = NotefulContext
  render() {    
    return (
      <div className='note'>
        <h2 className='note_title'>
          <Link to={{
            pathname: `/note/${this.props.note.id}`,
            folderId: this.props.note.folderId
          }}>
            {this.props.note.name}
          </Link>
        </h2>
        <div className=''>
          <span>{this.props.note.modified.slice(0, this.props.note.modified.indexOf("T"))}</span>
        </div>
        <button className='delete_note' onClick={() => { deleteNoteRequest(this.props.note.id, this.context.deleteNote) }}>Delete Note</button>
      </div>
    )
  }
}

export default Note