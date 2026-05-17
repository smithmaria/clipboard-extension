const ShortClip = ({ content, onClick, deleting, onDelete }) => {
  return (
    <div className='clip short' onClick={onClick}>
      {deleting && (
        <div className='clip-delete' onClick={(e) => { e.stopPropagation(); onDelete(); }}>
          ×
        </div>
      )}
      {content}
    </div>
  )
}

export default ShortClip;
