import React, { useState, useEffect } from 'react';
import './styles/Popup.css'
import FolderList from './views/FolderList/FolderList';
import FolderClips from './views/FolderClips/FolderClips';
import { useFolders } from './hooks/useFolders';

const DEFAULT_NAV = { view: 'folderList', folderId: null, clipId: null };

function Popup() {
  const { folders, addFolder, renameFolder, reorderFolders, deleteFolder } = useFolders();
  const [nav, setNav] = useState(DEFAULT_NAV);

  useEffect(() => {
    chrome.storage.session.get('nav', (result) => {
      setNav(result.nav ?? DEFAULT_NAV);
    });
  }, []);

  useEffect(() => {
    chrome.storage.session.set({ nav });
  }, [nav]);

  const currentFolder = folders.find(f => f.id === nav.folderId);

  switch (nav.view) {
    case 'folderClips':
      return <FolderClips
        folder={currentFolder}
        onReturn={() => setNav(DEFAULT_NAV)}
      />;
    default:
      return (
        <FolderList
          folders={folders}
          onSelect={(folderId) => setNav({ view: 'folderClips', folderId, clipId: null })}
          onAdd={addFolder}
          onEdit={renameFolder}
          onReorder={reorderFolders}
          onDelete={deleteFolder}
        />
      );
  }
}

export default Popup;
