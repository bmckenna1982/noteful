import React from 'react'
import Note from './note'
import './styles/noteListMain.css'

class NoteListMain extends React.Component {
  constructor(props) {
      super(props)
  }
  static defaultProps = {
    notes: []
  }
  
  render() {
    console.log(this.props.notes)
    return (
    <section className='NoteListMain'>
      <ul className='NoteListMain_list'>        
        {this.props.notes.map(note => (
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