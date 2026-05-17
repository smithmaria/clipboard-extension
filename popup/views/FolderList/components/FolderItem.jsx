import { useState } from 'react';
import Grab from '../../../assets/grab-dots.svg?react'
import Pencil from '../../../assets/pencil.svg?react';
import Trash from '../../../assets/trash.svg?react';
import DeleteConfirmationModal from '../../../components/DeleteConfirmationModal';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const FolderItem = ({ id, name, onSelect, onEdit, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(name);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = { transform: CSS.Transform.toString(transform), transition };

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

  function handleDelete() {
    onDelete?.(id);
    setConfirmingDelete(false);
  }

  return (
    <>
      <div
        className={`folder-item ${isDragging ? 'dragging' : ''}`} 
        ref={setNodeRef}
        onClick={() => !editing && onSelect?.(id)}
        style={style}
      >
        <div className='folder-name'>
          <Grab {...attributes} {...listeners} />
          {editing
            ? <input
                autoFocus
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            : <span className='folder-name-text'>{value}</span>
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
                <Pencil onClick={(e) => { e.stopPropagation(); setEditing(true); }} />
                <Trash onClick={(e) => { e.stopPropagation(); setConfirmingDelete(true); }}/>
              </>
          }
        </div>
      </div>
      {confirmingDelete && (
        <DeleteConfirmationModal 
          folderName={name}
          onConfirm={handleDelete}
          onCancel={() => setConfirmingDelete(false)}
        />
      )}
    </>
  )
}

export default FolderItem;