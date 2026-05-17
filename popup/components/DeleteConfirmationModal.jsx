const DeleteConfirmationModal = ({ folderName, onConfirm, onCancel }) => {
  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <h2>Delete folder?</h2>
        <p>Are you sure you want to delete <strong>{folderName}</strong>?</p>
        <div className='modal-actions'>
          <button className='modal-cancel' onClick={onCancel}>Cancel</button>
          <button className='modal-confirm' onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmationModal;
