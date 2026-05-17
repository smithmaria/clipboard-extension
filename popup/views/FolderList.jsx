import './FolderList.css'
import Folder from '../assets/folder.svg?react'
import FolderItem from '../components/FolderItem';

const FolderList = () => {
  return (
    <>
      <div className='popup-header'>
        <div>
          <Folder />
          <h1>Folders</h1>
        </div>
      </div>
      <div className='folder-list'>
        <FolderItem name='Math'/>
        <FolderItem name='Spanish'/>
        <div className='add-folder'>
          + Add new folder
        </div>
      </div>
    </>
  )
}

export default FolderList;