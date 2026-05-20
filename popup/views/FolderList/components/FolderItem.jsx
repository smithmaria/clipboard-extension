import { useState, useEffect } from 'react';
import Grab from '../../../assets/grab-dots.svg?react'
import Pencil from '../../../assets/pencil.svg?react';
import Trash from '../../../assets/trash.svg?react';
import DeleteConfirmationModal from '../../../components/DeleteConfirmationModal';
import { useFolders } from '../../../hooks/useFolders';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const FolderItem = ({ id, name, isEditing, onStartEdit, onCancelEdit, onSelect }) => {
  const { renameFolder, deleteFolder } = useFolders();
  const [value, setValue] = useState(name);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  useEffect(() => {
    if (!isEditing) setValue(name);
  }, [isEditing, name]);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = { transform: CSS.Transform.toString(transform), transition };

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') onCancelEdit();
  }

  function handleSave() {
    if(value.trim()) {
      renameFolder(id, value);
      onCancelEdit();
    }
  }

  function handleDelete() {
    deleteFolder(id);
    setConfirmingDelete(false);
  }

  return (
    <>
      <div
        className={`folder-item ${isDragging ? 'dragging' : ''}`}
        ref={setNodeRef}
        onClick={() => !isEditing && onSelect?.(id)}
        style={style}
      >
        <div className='folder-name'>
          <Grab {...attributes} {...listeners} />
          {isEditing
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
          {isEditing
            ? <>
                <button
                  className='folder-cancel'
                  onClick={onCancelEdit}
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
                <Pencil onClick={(e) => { e.stopPropagation(); onStartEdit(); }} />
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