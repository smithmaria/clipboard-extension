import Grab from '../assets/grab-dots.svg?react'
import Pencil from '../assets/pencil.svg?react';
import Trash from '../assets/trash.svg?react';

const FolderItem = ({ name }) => {
  return (
    <>
      <div className='folder-item'>
        <div className='folder-name'>
          <Grab />
          {name}
        </div>
       <div className='folder-actions'>
        <Pencil />
        <Trash />
       </div>
      </div>
    </>
  )
}

export default FolderItem;