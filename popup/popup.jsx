import React from 'react';
import './styles/Popup.css'
import FolderList from './views/FolderList/FolderList';
import FolderClips from './views/FolderClips/FolderClips';
import EditClip from './views/EditClip/EditClip';

import { FoldersProvider } from './hooks/useFolders';
import { NavProvider, useNav } from './hooks/useNav';

function PopupContent() {
  const { nav } = useNav();

  switch (nav.view) {
    case 'folderClips':
      return <FolderClips />;
    case 'createClip':
      return <EditClip isCreate={true} />;
    case 'editClip':
      return <EditClip isCreate={false} />;
    default:
      return <FolderList />;
  }
}

function Popup() {
  return (
    <NavProvider>
      <FoldersProvider>
        <PopupContent />
      </FoldersProvider>
    </NavProvider>
  );
}

export default Popup;
