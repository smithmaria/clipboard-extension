import './EditClip.css'
import CaretLeft from '../../assets/caret-left.svg?react'
import { useNav } from '../../hooks/useNav'
import { useFolders } from '../../hooks/useFolders'
import { useState } from 'react'

const EditClip = ({ isCreate }) => {
  const { nav, setNav } = useNav();
  const { addClip } = useFolders();

  const [content, setContent] = useState('');

  function handleSave () {
    if (!content.trim()) return;

    if (isCreate) {
      addClip(nav.folderId, content);
    } else {
      updateClip(nav.folderId, nav.clipId, { content });
    }

    setNav({ view: 'folderClips', folderId: nav.folderId, clipId: null });
  }

  return (
    <>
      <div className='popup-header'>
        <div className='header-title'>
          <CaretLeft 
            className='header-return'
            onClick={() => {setNav({ view: 'folderClips', folderId: nav.folderId, clipId: null })}} 
          />
          <h1>{isCreate ? 'Create' : 'Edit'} Clip</h1>
        </div>
      </div>
      <div className='input-container'>
        <label>Clip</label>
        <textarea 
          className='clip-textarea' 
          placeholder='Clip' 
          rows={1}
          onChange={(e) => {
            setContent(e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
            e.target.style.overflow = e.target.scrollHeight >= 400 ? 'auto' : 'hidden';
          }}
        />
      </div>
      <div className='edit-actions'>
        <button>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </>
  )
}

export default EditClip;