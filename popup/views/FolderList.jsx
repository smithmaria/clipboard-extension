import { useState } from 'react';
import './FolderList.css'
import Folder from '../assets/folder.svg?react'
import FolderItem from '../components/FolderItem';

const FolderList = ({ folders, onAdd, onEdit, onDelete }) => {
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');

  function handleSave() {
    if (newName.trim()) onAdd?.(newName.trim());
      setNewName('');
      setAdding(false);
  }

  function handleCancel() {
    setNewName('');
    setAdding(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  }

  return (
    <>
      <div className='popup-header'>
        <div>
          <Folder />
          <h1>Folders</h1>
        </div>
      </div>
      <div className='folder-list'>
        {folders.map((folder) => (
          <FolderItem
            key={folder.id}
            id={folder.id}
            name={folder.name}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
        {adding
          ? <div className='folder-item'>
              <input
                autoFocus
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Name'
              />
              <div className='folder-actions'>
                <button onClick={handleCancel}>Cancel</button>
                <button className='folder-save' onClick={handleSave}>Save</button>
              </div>
            </div>
          : <div className='add-folder' onClick={() => setAdding(true)}>
              + Add new folder
            </div>
        }
      </div>
    </>
  )
}

export default FolderList;