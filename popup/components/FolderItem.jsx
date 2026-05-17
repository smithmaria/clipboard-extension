import { useState } from 'react';
import Grab from '../assets/grab-dots.svg?react'
import Pencil from '../assets/pencil.svg?react';
import Trash from '../assets/trash.svg?react';

const FolderItem = ({ id, name, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(name);

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') setEditing(false);
  }

  function handleSave() {
    if(value.trim()) {
      onEdit?.(id, value);
      setEditing(false);
    }
  }

  return (
    <>
      <div className='folder-item'>
        <div className='folder-name'>
          <Grab />
          {editing
            ? <input
                autoFocus
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            : value
          }
        </div>
        <div className='folder-actions'>
          {editing
            ? <>
                <button
                  className='folder-cancel'
                  onClick={() => { setValue(name); setEditing(false); }}
                >
                    Cancel
                </button>
                <button 
                  className='folder-save'
                  onClick={() => handleSave()}
                >
                  Save
                </button>
              </>
            : <>              
                <Pencil onClick={() => setEditing(true)} />
                <Trash />
              </>
          }
        </div>
      </div>
    </>
  )
}

export default FolderItem;