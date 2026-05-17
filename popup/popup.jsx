import React, { useState } from 'react';
import './styles/Popup.css'
import FolderList from './views/FolderList/FolderList';
import FolderClips from './views/FolderClips/FolderClips';
import { useFolders } from './hooks/useFolders';

function Popup() {
  const { folders, addFolder, renameFolder, reorderFolders, deleteFolder } = useFolders();
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const selectedFolder = folders.find(f => f.id === selectedFolderId);

  if (selectedFolder) {
    return <FolderClips 
              folder={selectedFolder}
              onReturn={() => setSelectedFolderId(null)} 
            />;
  }

  return (
    <>
      <FolderList 
        folders={folders}
        onSelect={setSelectedFolderId}
        onAdd={addFolder}
        onEdit={renameFolder}
        onReorder={reorderFolders}
        onDelete={deleteFolder}
      />
    </>
  );
}

export default Popup;