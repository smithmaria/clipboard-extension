import './EditClip.css'
import CaretLeft from '../../assets/caret-left.svg?react'
import { useNav } from '../../hooks/useNav'
import { useFolders } from '../../hooks/useFolders'
import { getStorage, setStorage } from '../../hooks/useStorage'
import { renderLatex } from '../../utils/latex'
import { useState, useEffect, useRef } from 'react'

const EditClip = ({ isCreate }) => {
  const { nav, setNav } = useNav();
  const { folders, addClip, updateClip } = useFolders();

  const existingClip = !isCreate
    ? folders.find(f => f.id === nav.folderId)?.clips.find(c => c.id === nav.clipId)
    : null;

  const [content, setContent] = useState(existingClip?.content ?? '');
  const [isLatex, setIsLatex] = useState(existingClip?.isLatex ?? false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      const el = textareaRef.current;
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
      el.style.overflow = el.scrollHeight >= 400 ? 'auto' : 'hidden';
      el.selectionStart = el.selectionEnd = el.value.length;
    }
  }, []);

  useEffect(() => {
    if (!isCreate) return;
    getStorage('latexMode').then(({ latexMode }) => {
      if (latexMode !== undefined) setIsLatex(latexMode);
    });
  }, []);

  function handleSave () {
    if (!content.trim()) return;

    if (isCreate) {
      addClip(nav.folderId, content, isLatex);
    } else {
      updateClip(nav.folderId, nav.clipId, { content, isLatex });
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
        <button
          className={`latex-toggle ${isLatex ? 'active' : ''}`}
          onClick={() => {
            const next = !isLatex;
            setIsLatex(next);
            if (isCreate) setStorage({ latexMode: next });
          }}
          title="Toggle LaTeX mode"
        >
          ∑
        </button>
      </div>
      <div className='input-container'>
        <label>{isLatex ? 'LaTeX' : 'Clip'}</label>
        <textarea
          autoFocus
          ref={textareaRef}
          className='clip-textarea'
          placeholder={isLatex ? 'e.g. \\frac{1}{2}' : 'Clip'}
          value={content}
          rows={1}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSave();
            }
          }}
          onChange={(e) => {
            setContent(e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
            e.target.style.overflow = e.target.scrollHeight >= 400 ? 'auto' : 'hidden';
          }}
        />
        {isLatex && (
          <>
            <label>LaTeX Preview</label>
            <div
              className='latex-preview'
              dangerouslySetInnerHTML={{ __html: renderLatex(content) }}
            />
          </>
        )}
      </div>
      <div className='edit-actions'>
        <button>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </>
  )
}

export default EditClip;