import { renderLatex } from '../../../utils/latex'

const LongClip = ({ content, isLatex, onClick, deleting, onDelete, copied }) => {
  return (
    <div className='clip long' onClick={onClick}>
      {deleting && (
        <div className='clip-delete' onClick={(e) => { e.stopPropagation(); onDelete(); }}>
          ×
        </div>
      )}
      {copied && (
        <div className='clip-copied'>
          <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 4 9.5 L 7.5 13 L 14 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
      {isLatex
        ? <div className='latex-preview-clip' dangerouslySetInnerHTML={{ __html: renderLatex(content) }} />
        : content
      }
    </div>
  )
}

export default LongClip;
