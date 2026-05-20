import { useState } from 'react';
import './FolderList.css'
import Folder from '../../assets/folder.svg?react'
import FolderItem from './components/FolderItem';
import { useNav } from '../../hooks/useNav';
import { useFolders } from '../../hooks/useFolders';

import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';

const FolderList = () => {
  const { setNav } = useNav();
  const { folders, addFolder, reorderFolders } = useFolders();
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = folders.findIndex(f => f.id === active.id);
      const newIndex = folders.findIndex(f => f.id === over.id);
      reorderFolders(arrayMove(folders, oldIndex, newIndex));
    }
  }

  function handleSave() {
    if (newName.trim()) addFolder(newName.trim());
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
        <div className='header-title'>
          <Folder />
          <h1>Folders</h1>
        </div>
      </div>
      <div className='folder-list'>
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={() => document.body.classList.add('dragging')}
          onDragEnd={(event) => { document.body.classList.remove('dragging'); handleDragEnd(event); }}
        >
          <SortableContext
            items={folders.map(f => f.id)}
            strategy={verticalListSortingStrategy}
          >
            {folders.map((folder) => (
              <FolderItem
                key={folder.id}
                id={folder.id}
                name={folder.name}
                onSelect={(folderId) => setNav({ view: 'folderClips', folderId, clipId: null })}
              />
            ))}
          </SortableContext>
        </DndContext>
        {adding
          ? <div className='folder-item'>
              <div className='folder-name'>
                <input
                  autoFocus
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder='Name'
                />
              </div>
              <div className='folder-actions'>
                <button className='folder-cancel' onClick={handleCancel}>Cancel</button>
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
