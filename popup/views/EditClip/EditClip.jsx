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
    </>
  )
}

export default EditClip;