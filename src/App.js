import React from 'react'
import { Route, Link } from 'react-router-dom'
import NoteListNav from './components/noteListNav'
import NotePageNav from './components/notePageNav'
import NoteListMain from './components/noteListMain'
import NotePageMain from './components/notePageMain'
import AddFolder from './components/addFolder'
import AddNote from './components/addNote'
import config from './config'

import NotefulContext from './NotefulContext'
import NoteListError from './components/noteListError'
import NavError from './components/navError'
import NoteError from './components/noteError'

import './App.css'

class App extends React.Component {
  state = {
    folders: [],
    notes: [],
    error: null
  }

  componentDidMount() {
    this.getFolders()
    this.getNotes()

    // setTimeout(() => this.setState(dummyStore), 600)
  }

  getFolders() {    
    fetch(`${config.API_ENDPOINT}/api/folders`)
      .then(response => {
        if (!response.ok) {          
          throw new Error(response.status)
        }
        return response.json()
      })
      .then(responseJson => this.setState({ folders: responseJson }))
      .catch(error => this.setState({
        error: error
      }))
  }

  getNotes() {
    const fetchUrl = `${config.API_ENDPOINT}/api/notes`
    fetch(fetchUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status)
        }
        return response.json()
      })
      .then(responseJson => this.setState({ notes: responseJson }))      
      .catch(error => this.setState({
        error: error
      }))
  }

  filterFolders = folderId => {
    const folder = folderId
      ? this.state.folders.filter(folder => folder.folderId === folderId)
      : this.state.folders
    return folder
  }

  filterNotes = (folderId) => {    
    const folder = folderId
      ? this.state.notes.filter(note => note.folder_id == folderId)
      : this.state.notes
    
    return folder
  }

  findNote = noteId => {
    // const note = this.state.notes.filter(note => note.id === noteId)[0]    
    const note = this.state.notes.find(note => note.id == noteId)    
    return note
  }

  findFolder = folderId => {
    const folder = this.state.folders.find(folder => folder.id === folderId)
    return folder
  }

  deleteNote = noteId => {    
    const newNotes = this.state.notes.filter(note => note.id !== noteId)    
    this.setState({
      notes: newNotes
    })
  }

  addFolder = folder => {
    // const folderId = `${Math.random().toString(36).substr(2, 8)}-${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 12)}`      
    // const newFolders = [...this.state.folders, folder]
    this.setState({
      folders: [...this.state.folders, folder]
    })
  }

  addNote = note => {
    this.setState({
      notes: [...this.state.notes, note]
    })
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
      findFolder: this.findFolder,
      findNote: this.findNote,
      filterNotes: this.filterNotes,
      filterFolders: this.filterFolders,
      addFolder: this.addFolder,
      addNote: this.addNote
    }
    
    const error = this.state.error
    return (
      <div className='App'>
        <header className='App_header'>
          <h1>
            <Link to='/'>Noteful</Link>
          </h1>
          <div className='App_error' role='alert'>
            {error && <p>{error.message} Error fetching data</p>}
          </div>
        </header>

        <NotefulContext.Provider value={contextValue}>
          <div className='App_wrapper'>
            <NavError>
              <nav className='App_nav'>
                {/* <Route exact path='/' render={props => <NoteListNav {...props} folders={this.filterFolders()} />} /> */}
                <Route exact path='/' component={NoteListNav} />
                {/* <Route path='/folder/:folderId' render={props => <NoteListNav {...props} folders={this.filterFolders()} />} /> */}
                <Route path='/api/folders/:folderId' component={NoteListNav} />
                {/* <Route path='/note/:noteId' render={props => <NotePageNav {...props} folder={this.findFolder(props.history.location.folderId)} />} /> */}
                <Route path='/api/notes/:noteId' component={NotePageNav} />
                {/* <Route path='/add-folder' component={NotePageNav}/>
              <Route path='/add-note' component={NotePageNav}/> */}
              </nav>
            </NavError>
            <NoteListError>
              <main className='App_main'>
                {/* <Route exact path='/' render={props => <NoteListMain {...props} notes={this.filterNotes()} />} /> */}
                <Route exact path='/' component={NoteListMain} />
                {/* <Route path='/folder/:folderId' render={props => <NoteListMain {...props} notes={this.filterNotes(props.match.params.folderId)} />} /> */}
                <Route path='/api/folders/:folderId' component={NoteListMain} />
                {/* <Route path='/note/:noteId' render={props => <NotePageMain {...props} note={this.findNote(props.match.params.noteId)} />} />               */}
                <Route path='/api/notes/:noteId' component={NotePageMain} />
                <Route exact path='/api/addFolder' component={AddFolder} />
                <Route exact path='/api/addNote' component={AddNote} />
              </main>
            </NoteListError>
          </div>
        </NotefulContext.Provider>

      </div>
    )
  }
}

export default App
