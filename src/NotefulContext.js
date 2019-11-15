import React from 'react'

const NotefulContext = React.createContext({
  folders: [],
  notes: [],
  filterFolders: () => {},
  findFolder: () => {},
  filterNotes: () => {},
  findNote: () => {},
  deleteNote: () => {},
  addFolder: () => {},
  addNote: () => {}

})

export default NotefulContext