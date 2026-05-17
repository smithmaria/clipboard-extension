import './FolderClips.css'
import Folder from '../../assets/folder.svg?react'
import Plus from '../../assets/plus.svg?react'
import Pencil from '../../assets/pencil.svg?react'

import LayoutToggle from './components/LayoutToggle'

const FolderClips = ({ folder, onReturn }) => {
  function handleReturn () {
    onReturn();
  }

  return (
    <>
      <div className='popup-header'>
        <div className='header-title'>
          <Folder onClick={handleReturn} className='folder-return' />
          <h1>{folder.name}</h1>
        </div>
        <div className='clip-action-container'>
          <div className='clip-action plus'>
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