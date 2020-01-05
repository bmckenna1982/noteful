import React from 'react'
import { Link } from 'react-router-dom'
import Note from './note'
import NotefulContext from '../NotefulContext'
import './styles/noteListMain.css'

class NoteListMain extends React.Component {

  static defaultProps = {
    notes: [],
    match: {
      params: {
        // folderId: 'test_folder'
      }
    }
  }
  

  static contextType = NotefulContext

  render() {    
    const filteredNotes = this.context.filterNotes(this.props.match.params.folderId)
    return (
    <section className='NoteListMain'>
      <ul className='NoteListMain_list'>        
        {/* {this.context.notes.map(note => ( */}
          {filteredNotes.map(note => (
          <li key={note.id}>
            <Note note={note} />           
          </li>
        ))}
      </ul>
      <Link className='add_note_link' to={'/api/addNote'}>Add note</Link>
    </section>
    )
  }
}
export default NoteListMain