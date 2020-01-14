import React from 'react'
import './styles/addFolder.css'
import NotefulContext from '../NotefulContext'
import ValidationError from '../components/validationError'
import config from '../config'


export default class AddFolder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      folderName: {
        value: '',
        touched: false
      }
    }
  }

  static contextType = NotefulContext

  updateFolderName(name) {
    this.setState({
      folderName: {
        value: name,
        touched: true
      }
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const folder = e.target.folderName.value
    const url = `${config.API_ENDPOINT}/api/folders`

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({ folder_name: folder }),
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
        console.log(responseJson)
        this.props.history.push('/')
        this.context.addFolder(responseJson)
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  validateFolderName() {
    const folderName = this.state.folderName.value.trim()
    console.log(folderName)
    if (folderName.length === 0) {
      return 'Folder name is required'
    } else if (folderName.length < 3) {
      return 'Folder name must be at least 3 characters'
    }
  }

  render() {
    const folderError = this.validateFolderName()
    return (
      <div className='AddFolder'>
        <h2>Add a Folder</h2>
        <form className='AddFolder_form' onSubmit={this.handleSubmit}>
          <label htmlFor='folderName'>New folder name</label>
          <input type='text' name='folderName' id='folderName' required onChange={e => this.updateFolderName(e.target.value)}></input>
          {this.state.folderName.touched && <ValidationError message={folderError} />}
          <button type='submit' disabled={this.validateFolderName()}>Submit</button>
        </form>
      </div>
    )
  }
}
