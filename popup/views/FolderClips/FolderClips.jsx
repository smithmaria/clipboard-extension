import './FolderClips.css'
import Folder from '../../assets/folder.svg?react'
import Plus from '../../assets/plus.svg?react'
import Pencil from '../../assets/pencil.svg?react'
import LayoutToggle from './components/LayoutToggle'

import { useNav } from '../../hooks/useNav'

const FolderClips = ({ folder }) => {
  const { setNav } = useNav();

  return (
    <>
      <div className='popup-header'>
        <div className='header-title'>
          <Folder 
            onClick={() => {setNav({ view: 'folderList', folderId: null, clipId: null })}} 
            className='header-return' 
          />
          <h1>{folder.name}</h1>
        </div>
        <div className='clip-action-container'>
          <div 
            className='clip-action plus' 
            onClick={() => setNav({ view: 'createClip', folderId: folder.id, clipId: null })}>
            <Plus />
          </div>
          <div className='clip-action pencil'>
            <Pencil />
          </div>
          <LayoutToggle />
        </div>
      </div>
    </>
  )
}

export default FolderClips;