import './EditClip.css'
import CaretLeft from '../../assets/caret-left.svg?react'
import { useNav } from '../../hooks/useNav'

const EditClip = ({ isCreate }) => {
  const { nav, setNav } = useNav();

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
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
            e.target.style.overflow = e.target.scrollHeight >= 400 ? 'auto' : 'hidden';
          }}
        />
      </div>
      <div className='edit-actions'>
        <button>Cancel</button>
        <button>Save</button>
      </div>
    </>
  )
}

export default EditClip;