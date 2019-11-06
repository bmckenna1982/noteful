import React from 'react'
import { Link } from 'react-router-dom'

class Note extends React.Component {
  render() {
    console.log(this.props.note)
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
        <button className='delete_note'>Delete Note</button>
      </div>
    )
  }
}

export default Note