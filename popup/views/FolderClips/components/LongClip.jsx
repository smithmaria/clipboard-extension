const LongClip = ({ content, onClick }) => {
  return (
    <>
      <div className='long-clip' onClick={onClick}>
        {content}
      </div>
    </>
  )
}

export default LongClip;