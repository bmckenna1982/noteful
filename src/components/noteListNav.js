import React from 'react'
import NotefulContext from '../NotefulContext'
import { NavLink, Link } from 'react-router-dom'
import './styles/noteListNav.css'

class NoteListNav extends React.Component {
  static contextType = NotefulContext

  render() {
    return (
      <div className='NoteListNav'>
        <ul className='NoteListNav_list'>
          {this.context.folders.map(folder => 
            <li key={folder.id}>
              <NavLink className='NoteListNav_folder-link' to={`/folder/${folder.id}`}>
              {folder.name}
              </NavLink>
            </li>
          )}
        </ul>        
        <button className="Add_folder">Add folder</button>
      </div>  
    )
  }
}

export default NoteListNav