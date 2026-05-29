import './FolderClips.css'
import Folder from '../../assets/folder.svg?react'
import Plus from '../../assets/plus.svg?react'
import Pencil from '../../assets/pencil.svg?react'
import LayoutToggle from './components/LayoutToggle'
import LongClip from './components/LongClip'
import ShortClip from './components/ShortClip'

import { useRef, useState } from 'react'
import { useNav } from '../../hooks/useNav'
import { useFolders } from '../../hooks/useFolders'

const FolderClips = () => {
  const { nav, setNav } = useNav();
  const { folders, deleteClip, setFolderLayout } = useFolders();
  const folder = folders.find(f => f.id === nav.folderId);
  const layout = folder.layout ?? 'list';

  const hasClips = folder.clips.length > 0;

  const [deleting, setDeleting] = useState(false);
  const effectiveDeleting = deleting && hasClips;
  const [copiedClipId, setCopiedClipId] = useState(null);
  const copyTimeoutRef = useRef(null);

  const handleCopy = (clip) => {
    navigator.clipboard.writeText(clip.content);
    setCopiedClipId(clip.id);
    clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = setTimeout(() => setCopiedClipId(null), 1500);
  };

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
            className={`clip-action plus ${effectiveDeleting ? 'disabled' : ''}`}
            onClick={() => !effectiveDeleting && setNav({ view: 'createClip', folderId: folder.id, clipId: null })}>
            <Plus />
          </div>
          <div
            className={`clip-action pencil ${effectiveDeleting ? 'active' : ''} ${!hasClips ? 'disabled' : ''}`}
            onClick={() => hasClips && setDeleting(d => !d)}>
            <Pencil />
          </div>
          <LayoutToggle layout={layout} setLayout={(l) => setFolderLayout(folder.id, l)} />
        </div>
      </div>
      <div className='clip-container'>
        {!hasClips
          ? <p className='clips-empty'>No clips yet. Hit + to add one.</p>
          : layout === 'list'
            ? (
              <div className='clip-list'>
                {folder.clips.map((clip) =>
                  <LongClip
                    key={clip.id}
                    content={clip.content}
                    isLatex={clip.isLatex}
                    deleting={effectiveDeleting}
                    copied={copiedClipId === clip.id}
                    onDelete={() => deleteClip(folder.id, clip.id)}
                    onClick={() => effectiveDeleting
                      ? setNav({ view: 'editClip', folderId: folder.id, clipId: clip.id })
                      : handleCopy(clip)
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
                    isLatex={clip.isLatex}
                    deleting={effectiveDeleting}
                    copied={copiedClipId === clip.id}
                    onDelete={() => deleteClip(folder.id, clip.id)}
                    onClick={() => effectiveDeleting
                      ? setNav({ view: 'editClip', folderId: folder.id, clipId: clip.id })
                      : handleCopy(clip)
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