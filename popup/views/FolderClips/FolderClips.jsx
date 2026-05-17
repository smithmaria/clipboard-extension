import './FolderClips.css'
import Folder from '../../assets/folder.svg?react'

const FolderClips = ({ folder, onReturn }) => {
  function handleReturn () {
    onReturn();
  }

  return (
    <>
      <div className='popup-header'>
        <div>
          <Folder onClick={handleReturn} className='folder-return' />
          <h1>{folder.name}</h1>
        </div>
      </div>
    </>
  )
}

export default FolderClips;