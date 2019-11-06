import React from 'react'
import Note from './note'

class NotePageMain extends React.Component {
  render() {
    console.log(this.props.note)
    return (
      <section className='NotePageMain'>
        <Note note={this.props.note}/>
        <div className='NotePageMain_content'>
          {this.props.note.content.split(/\n \r|\n/).map((para, i) => 
            <p key={i}>{para}</p>
          )}
        </div>
      </section>      
    )
  }
}

export default NotePageMain