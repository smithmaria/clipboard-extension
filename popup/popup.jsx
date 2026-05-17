import React from 'react';
import './styles/Popup.css'
import FolderList from './views/FolderList';
import { useFolders } from './hooks/useFolders';

function Popup() {
  const { folders, addFolder, renameFolder, deleteFolder } = useFolders();

  return (
    <>
      <FolderList 
        folders={folders}
        onAdd={addFolder}
        onEdit={renameFolder}
      />
    </>
  );
}

export default Popup;