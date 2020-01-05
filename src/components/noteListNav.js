import React from 'react'
import NotefulContext from '../NotefulContext'
import { NavLink, Link } from 'react-router-dom'
import './styles/noteListNav.css'

class NoteListNav extends React.Component {
  static contextType = NotefulContext

  handleAdd = e => {
    e.preventDefault()

  }

  render() {
    return (
      <div className='NoteListNav'>
        <ul className='NoteListNav_list'>
          {this.context.folders.map(folder => 
            <li key={folder.id}>
              <NavLink className='NoteListNav_folder-link' to={`/api/folders/${folder.id}`}>
              {folder.folder_name}
              </NavLink>
            </li>
          )}
        </ul>        
        <Link className="Add_folder" to={'/api/addFolder'}>Add folder</Link>
      </div>  
    )
  }
}

export default NoteListNav