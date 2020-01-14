import React from 'react'
import Note from './note'
import NotefulContext from '../NotefulContext'
import './styles/notePageMain.css'

class NotePageMain extends React.Component {
  static contextType = NotefulContext
  
  render() {
    const selectedNote = this.context.findNote(this.props.match.params.noteId)  
    
    return (
      <section className='NotePageMain'>
        <Note note={selectedNote}/>
        <div className='NotePageMain_content'>
          {selectedNote.content.split(/\n \r|\n/).map((para, i) => 
            <p key={i}>{para}</p>
          )}
        </div>
      </section>      
    )
  }
}

export default NotePageMain