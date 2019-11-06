import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import NoteListNav from './components/noteListNav'
import NotePageNav from './components/notePageNav'
import NoteListMain from './components/noteListMain'
import NotePageMain from './components/notePageMain'
import dummyStore from './data/dummy-store'
import './App.css'

class App extends React.Component {
  state = {
    folders: [],
    notes: []
  }

  componentDidMount() {
    setTimeout(() => this.setState(dummyStore), 600)
  }

  // findFolder = (folders = [], folderId) => {
  //   return folders.find(folder => folder.id === folderId)
  // }

  // findNote = (notes=[], noteId) => {
  //   return notes.find(note => note.id === noteId)
  // }

  // getNotes = (notes=[], folder)

  // navRoutes() {
  //   const {folders, notes} = this.state
  //   return (
  //     <>
  //       <Route
  //         exact          
  //         path='/'
  //         render={props => (
  //           <NoteListNav
  //             folders={folders}
  //             notes={notes}
  //             {...props}
  //           />
  //         )}
  //       />
  //       <Route
  //         exact          
  //         path='/folder/:folderId'
  //         render={props => (
  //           <NoteListNav
  //             folders={folders}
  //             notes={notes}
  //             {...props}
  //           />          
  //         )}
  //       />
  //       <Route 
  //         path='.note/:noteId'
  //         render={props => {
  //           const {noteId} = props.match.params
  //           const note = findNote(notes, noteId) || {}
  //           const folder = findFolder(folder, note.folderId)
  //           return <NotePageNav {...props} folder={folder} />
  //         }}
  //         />
  //         <Route path='/add-folder' component={NotePageNav} />
  //         <Route path='/add-note' component={NotePageNav} />
  //     </>
  //   )
  // }

  // mainRoutes() {

  // }

  filterFolders(folderId) {
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

  findNote(noteId) {
    console.log(noteId)
    console.log(this.state.notes)
    const note = this.state.notes.filter(note => note.id === noteId)[0]
    return note
  }

  findFolder(folderId) {
    console.log(folderId)
    console.log(this.state.folders)
    const folder = this.state.folders.filter(folder => folder.id === folderId)[0]
    console.log(folder)
    return folder
  }

  render() {
    return (
      <div className='App'>
        <header className='App_header'>
          <h1>
            <Link to='/'>Noteful</Link>
          </h1>
        </header>
        <div className='App_wrapper'>
          <nav className='App_nav'>
            <Route exact path='/' render={props => <NoteListNav {...props} folders={this.filterFolders()} />} />
            <Route path='/folder/:folderId' render={props => <NoteListNav {...props} folders={this.filterFolders()} />}/>
            <Route path='/note/:noteId' render={props => <NotePageNav {...props} folder={this.findFolder(props.history.location.folderId)}/>}/>
            {/* <Route path='/add-folder' component={NotePageNav}/>
          <Route path='/add-note' component={NotePageNav}/> */}

          </nav>
          <main className='App_main'>
            {/* <Switch> */}
            <Route exact path='/' render={props => <NoteListMain {...props} notes={this.filterNotes()} />} />
            <Route path='/folder/:folderId' render={props => <NoteListMain {...props} notes={this.filterNotes(props.match.params.folderId)} />} />
            <Route path='/note/:noteId' render={props => <NotePageMain {...props} note={this.findNote(props.match.params.noteId)} />} />
            {/* </Switch> */}

          </main>
        </div>
      </div>
    )    
  }    
}

export default App
