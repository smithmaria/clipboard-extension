const LongClip = ({ content, onClick, deleting, onDelete }) => {
  return (
    <div className='long-clip' onClick={onClick}>
      {deleting && (
        <div className='clip-delete' onClick={(e) => { e.stopPropagation(); onDelete(); }}>
          ×
        </div>
      )}
      {content}
    </div>
  )
}

export default LongClip;
