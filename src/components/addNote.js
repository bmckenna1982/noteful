import React from 'react'
import NotefulContext from '../NotefulContext'
import ValidationError from './validationError'
import config from '../config'

export default class AddNote extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      name: {
        value: '',
        touched: false
      },
      text: {
        value: '',
        touched: false
      }
    }
  }

  static contextType = NotefulContext

  updateName(name) {
    this.setState({
      name: {
        value: name,
        touched: true
      }
    })
  }

  updateValue(text) {
    this.setState({
      text: {
        value: text,
        touched: true
      }
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const note = e.target.noteName.value
    const folderId = this.context.folders.find(folder => folder.folder_name === e.target.folderName.value).id
    const content = e.target.noteContent.value    
    const date = new Date()
    let dateTime = date.getFullYear() + '-' +
      (date.getMonth() + 1) + '-' +
      date.getDate() + 'T' +
      date.getHours() + ':' +
      date.getMinutes() + ':' +
      date.getSeconds() + ':' +
      date.getMilliseconds() + 'Z'
    const url = `${config.API_ENDPOINT}/api/notes`

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        note_name: note,        
        folder_id: folderId,
        content: content

      }),
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
        return response.json()
      })
      .then(responseJson => {
        this.props.history.push('/')
        this.context.addNote(responseJson)
      })
  }

  validateName() {
    const name = this.state.name.value.trim()
    if (name.length === 0) {
      return 'Name is required'
    } else if (name.length < 3) {
      return 'Name must be at least 3 characters'
    }
  }

  validateText() {
    const text = this.state.text.value.trim()
    if (text.length === 0) {
      return 'Content for this note is required'
    } else if (text.length < 3) {
      return 'Note conten must be at least 3 characters'
    }
  }



  render() {
    const nameError = this.validateName()
    const textError = this.validateText()
    
    return (
      <div className="AddNote">
        <h2>Add a Note</h2>
        {/* <ValidationError message={this.validateName()} /> */}
        <form className='AddNote_form' onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='folderName'>Select a folder: </label>
            <select name='folderName' id='folderName' required>
              {this.context.folders.map(folder => (
                <option key={folder.folder_name} value={folder.folder_name}>{folder.folder_name}</option>
              ))}
            </select>
            {' '}
            <label htmlFor='noteName'>New note name: </label>
            <input type='text' name='noteName' id='noteName' defaultValue='' required onChange={e => this.updateName(e.target.value)}></input>
            {this.state.name.touched && <ValidationError message={nameError} />}
          </div>
          <div className='form-group'>
            <label htmlFor='noteContent'>New note content: </label>
            <textarea name='noteContent' id='noteContent' rows='6' cols='75' required onChange={e => this.updateValue(e.target.value)}></textarea>
            {this.state.text.touched && <ValidationError message={textError} />}
          </div>
          <button
            type='submit'
            className='AddNote_form__submit'
            disabled={
              this.validateName() ||
              this.validateText()
            }
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}