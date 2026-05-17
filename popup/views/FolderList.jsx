import './FolderList.css'
import Folder from '../assets/folder.svg?react'
import FolderItem from '../components/FolderItem';

const FolderList = ({ folders }) => {
  return (
    <>
      <div className='popup-header'>
        <div>
          <Folder />
          <h1>Folders</h1>
        </div>
      </div>
      <div className='folder-list'>
        {folders.map((folder) => (
          <FolderItem
            key={folder.id}
            name={folder.name}
          />
        ))}
        <div className='add-folder'>
          + Add new folder
        </div>
      </div>
    </>
  )
}

export default FolderList;