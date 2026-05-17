import React from 'react';
import './styles/Popup.css'
import FolderList from './views/FolderList/FolderList';
import FolderClips from './views/FolderClips/FolderClips';
import EditClip from './views/EditClip/EditClip';

import { useFolders } from './hooks/useFolders';
import { NavProvider, useNav } from './hooks/useNav';

function PopupContent() {
  const { nav } = useNav();
  const { folders, addFolder, renameFolder, reorderFolders, deleteFolder } = useFolders();

  const currentFolder = folders.find(f => f.id === nav.folderId);

  switch (nav.view) {
    case 'folderClips':
      return <FolderClips folder={currentFolder} />;
    case 'createClip':
      return <EditClip isCreate={true} />;
    default:
      return (
        <FolderList
          folders={folders}
          onAdd={addFolder}
          onEdit={renameFolder}
          onReorder={reorderFolders}
          onDelete={deleteFolder}
        />
      );
  }
}

function Popup() {
  return (
    <NavProvider>
      <PopupContent />
    </NavProvider>
  );
}

export default Popup;
