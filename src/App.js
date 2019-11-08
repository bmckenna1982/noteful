import React from 'react'
import { Route, Link } from 'react-router-dom'
import NoteListNav from './components/noteListNav'
import NotePageNav from './components/notePageNav'
import NoteListMain from './components/noteListMain'
import NotePageMain from './components/notePageMain'
import NotefulContext from './NotefulContext'

import dummyStore from './data/dummy-store'
import './App.css'


class App extends React.Component {
  state = {
    folders: [],
    notes: []
  }

  componentDidMount() {
    this.getFolders()
    this.getNotes()
    
    // setTimeout(() => this.setState(dummyStore), 600)
  }

  getFolders() {
    const url = 'http://localhost:9090/folders'
    fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status)
      }
      return response.json()
    })
    .then(responseJson => this.setState({ folders: responseJson }))
    .catch(error => console.error(error))
  }

  getNotes() {
    const url = 'http://localhost:9090/notes'
    fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status)
      }
      return response.json()
    })
    .then(responseJson => this.setState({ notes: responseJson }))
    .catch(error => console.error(error.message))
  }

  filterFolders = folderId => {
    console.log(folderId)
    const folder = folderId
      ? this.state.folders.filter(folder => folder.folderId === folderId)
      : this.state.folders
    console.log(folder)
    return folder
  }

  filterNotes = (folderId) => {
    console.log(folderId)
    const folder = folderId
      ? this.state.notes.filter(note => note.folderId === folderId)
      : this.state.notes
    console.log(folder)
    return folder
  }

  findNote = noteId => {
    console.log(noteId)
    console.log(this.state.notes)
    const note = this.state.notes.filter(note => note.id === noteId)[0]
    return note
  }

  findFolder = folderId => {
    console.log(folderId)
    console.log(this.context.folders)
    const folder = this.state.folders.filter(folder => folder.id === folderId)[0]
    console.log(folder)
    return folder
  }

  deleteNote = noteId => {
    console.log(noteId)
    const newNotes = this.state.notes.filter(note => note.id !== noteId)
    this.setState({
      notes: newNotes
    })    
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
      findFolder: this.findFolder
    }
    return (
      <div className='App'>
        <header className='App_header'>
          <h1>
            <Link to='/'>Noteful</Link>
          </h1>
        </header>
        <NotefulContext.Provider value={contextValue}>
          <div className='App_wrapper'>
            <nav className='App_nav'>
              {/* <Route exact path='/' render={props => <NoteListNav {...props} folders={this.filterFolders()} />} /> */}
              <Route exact path='/' component={NoteListNav} />
              {/* <Route path='/folder/:folderId' render={props => <NoteListNav {...props} folders={this.filterFolders()} />} /> */}
              <Route path='/folder/:folderId' component={NoteListNav}/>
              {/* <Route path='/note/:noteId' render={props => <NotePageNav {...props} folder={this.findFolder(props.history.location.folderId)} />} /> */}
              <Route path='/note/:noteId' component={NotePageNav}/>
              {/* <Route path='/add-folder' component={NotePageNav}/>
              <Route path='/add-note' component={NotePageNav}/> */}
            </nav>
            <main className='App_main'>              
              <Route exact path='/' render={props => <NoteListMain {...props} notes={this.filterNotes()} />} />
              <Route path='/folder/:folderId' render={props => <NoteListMain {...props} notes={this.filterNotes(props.match.params.folderId)} />} />
              <Route path='/note/:noteId' render={props => <NotePageMain {...props} note={this.findNote(props.match.params.noteId)} />} />              
            </main>
          </div>
        </NotefulContext.Provider>
      </div>
    )
  }
}

export default App
