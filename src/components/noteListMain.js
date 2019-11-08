import React from 'react'
import Note from './note'
import NotefulContext from '../NotefulContext'
import './styles/noteListMain.css'

class NoteListMain extends React.Component {
  constructor(props) {
      super(props)
  }
  static defaultProps = {
    notes: []
  }
  
  static contextType = NotefulContext

  render() {
    console.log(this.context)
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
      <button className='add_note'>Add note</button>
    </section>
    )
  }
}
export default NoteListMain