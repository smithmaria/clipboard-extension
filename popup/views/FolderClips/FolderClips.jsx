import './FolderClips.css'
import Folder from '../../assets/folder.svg?react'
import Plus from '../../assets/plus.svg?react'
import Pencil from '../../assets/pencil.svg?react'
import LayoutToggle from './components/LayoutToggle'
import LongClip from './components/LongClip'
import ShortClip from './components/ShortClip'

import { useState } from 'react'
import { useNav } from '../../hooks/useNav'
import { useFolders } from '../../hooks/useFolders'

const FolderClips = () => {
  const { nav, setNav } = useNav();
  const { folders, deleteClip, setFolderLayout } = useFolders();
  const folder = folders.find(f => f.id === nav.folderId);
  const layout = folder.layout ?? 'list';

  const [deleting, setDeleting] = useState(false);

  return (
    <>
      <div className='popup-header'>
        <div className='header-title'>
          <Folder
            onClick={() => {setNav({ view: 'folderList', folderId: null, clipId: null })}}
            className='header-return'
          />
          <h1>{folder.name}</h1>
        </div>
        <div className='clip-action-container'>
          <div
            className={`clip-action plus ${deleting ? 'disabled' : ''}`}
            onClick={() => !deleting && setNav({ view: 'createClip', folderId: folder.id, clipId: null })}>
            <Plus />
          </div>
          <div className={`clip-action pencil ${deleting ? 'active' : ''}`} onClick={() => setDeleting(d => !d)}>
            <Pencil />
          </div>
          <LayoutToggle layout={layout} setLayout={(l) => setFolderLayout(folder.id, l)} />
        </div>
      </div>
      <div className='clip-container'>
        {layout === 'list' 
          ? (      
            <div className='clip-list'>
              {folder.clips.map((clip) =>
                <LongClip
                  key={clip.id}
                  content={clip.content}
                  deleting={deleting}
                  onDelete={() => deleteClip(folder.id, clip.id)}
                  onClick={() => deleting
                    ? setNav({ view: 'editClip', folderId: folder.id, clipId: clip.id })
                    : navigator.clipboard.writeText(clip.content)
                  }
                />
              )}
            </div>
            )
          : (
            <div className='clip-grid'>
              {folder.clips.map((clip) =>
                <ShortClip
                  key={clip.id}
                  content={clip.content}
                  deleting={deleting}
                  onDelete={() => deleteClip(folder.id, clip.id)}
                  onClick={() => deleting
                    ? setNav({ view: 'editClip', folderId: folder.id, clipId: clip.id })
                    : navigator.clipboard.writeText(clip.content)
                  }
                />
              )}
        </div>
          )
        }
      </div>
    </>
  )
}

export default FolderClips;