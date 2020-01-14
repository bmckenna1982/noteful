import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import NotefulContext from '../NotefulContext'
import config from '../config'
import './styles/note.css'

// function deleteNoteRequest(noteId, callback) {
//   const url = `http://localhost:8000/api/notes/${noteId}`
//   fetch(url, {
//     method: 'DELETE',
//     headers: {
//       'content-type': 'application/json'
//     }
//   })    
//     .then(response => {
//       if (!response.ok) {
//         return response.json().then(error => {
//           throw error
//         })
//       }
//       // return response.json()
//     })
//     .then(() => { 
//       callback(noteId)
//     })
//     .then(() => this.props.history.push('/'))
//     .catch(error => {
//       console.error(error)
//     })
// }

class Note extends React.Component {
  static defaultProps = {
    note: {
      id: '',
      note_name: '',
      modified_date: ''
    }
  }

  static contextType = NotefulContext

  handleDelete = () => {
    
  const url = `${config.API_ENDPOINT}/${this.props.note.id}`
  fetch(url, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  })    
    .then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          throw error
        })
      }
      // return response.json()
    })
    .then(() => { 
      this.context.deleteNote(this.props.note.id)
    })
    .then(() => this.props.history.push('/'))
    .catch(error => {
      console.error(error)
    })
  }

  render() {
    console.log('this.props.note', this.props.note)
    return (
      <div className='Note'>
        <h2 className='Note_title'>
          <Link to={{
            pathname: `/api/notes/${this.props.note.id}`,
            folderId: this.props.note.folderId
          }}>
            {this.props.note.note_name}
          </Link>
        </h2>
        <div className='Note_container'>
          <span className='Note_container__date'>Date modified on {this.props.note.modified_date.slice(0, this.props.note.modified_date.indexOf("T"))}</span>
          <button className='Note_container__delete' onClick={this.handleDelete}>Delete Note</button>
        </div>
      </div>
    )
  }
}

Note.propTypes = {
  note: (props, propName, componentName) => {
    const prop = props[propName]

    if (!prop) {
      return new Error(`${propName} is required in ${componentName}. Validation Failed`)
    }

    if (typeof prop != 'object') {
      return new Error(`Invalid prop, ${propName} ixpected to be an object in ${componentName}. ${typeof prop} found.`)
    }

  }
}

export default withRouter(Note)