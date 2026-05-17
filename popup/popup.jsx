import React from 'react';
import './styles/Popup.css'
import FolderList from './views/FolderList';
import { useFolders } from './hooks/useFolders';

function Popup() {
  // const { addFolder, renameFolder, deleteFolder } = useFolders();
  const folders = [
    { id: 1, name: 'Math' },
    { id: 2, name: 'Spanish' },
  ]
  return (
    <>
      <FolderList 
        folders={folders}
      />
    </>
  );
}

export default Popup;